'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Camera, Program, Mesh, Geometry, Vec2, Color } from 'ogl';

interface FluidBackgroundProps {
    config?: {
        stiffness: number;
        damping: number;
        mass: number;
    };
    colors?: {
        color1: string;
        color2: string;
        color3: string;
    };
    grainOpacity?: number;
    blurStrength?: number;
    debug?: boolean;
}

const vertex = /* glsl */ `
    attribute vec2 uv;
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
    }
`;

const fragment = /* glsl */ `
    precision highp float;
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform vec2 uMouse;
    uniform vec2 uResolution;
    uniform float uFlowSpeed;
    uniform float uInteractionStrength;
    
    varying vec2 vUv;

    // Simplex 3D Noise 
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

        // First corner
        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 = v - i + dot(i, C.xxx) ;

        // Other corners
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );

        //  x0 = x0 - 0.0 + 0.0 * C.xxx;
        //  x1 = x0 - i1 + 1.0 * C.xxx;
        //  x2 = x0 - i2 + 2.0 * C.xxx;
        //  x3 = x0 - 1.0 + 3.0 * C.xxx;
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
        vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

        // Permutations
        i = mod289(i);
        vec4 p = permute( permute( permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

        // Gradients: 7x7 points over a square, mapped onto an octahedron.
        // The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
        float n_ = 0.142857142857; // 1.0/7.0
        vec3  ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );

        //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
        //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);

        //Normalise gradients
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        // Mix final noise value
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
    }

    // FBM (Fractal Brownian Motion)
    float fbm(vec3 x) {
        float v = 0.0;
        float a = 0.5;
        vec3 shift = vec3(100.0);
        for (int i = 0; i < 3; ++i) {
            v += a * snoise(x);
            x = x * 2.0 + shift;
            a *= 0.5;
        }
        return v;
    }

    void main() {
        vec2 st = vUv;
        vec2 gridSt = st;
        // Correct aspect ratio for both grid and mouse interaction
        float aspect = uResolution.x / uResolution.y;
        gridSt.x *= aspect;
        
        vec2 gridMouse = uMouse;
        gridMouse.x *= aspect;

        float dist = distance(gridSt, gridMouse);
        
        // Interaction Shape
        // Create a larger, softer influence field
        float mouseForce = smoothstep(0.5, 0.0, dist) * uInteractionStrength;
        
        // Base Flow
        vec3 p = vec3(gridSt * 3.0, uTime * uFlowSpeed);
        
        // Distort noise domain with mouse
        // We push the 'z' coordinate to animate, and 'xy' to warp
        float noiseVal = fbm(p + vec3(mouseForce * 0.5, mouseForce * 0.5, 0.0));
        
        // Secondary noise layer
        float q = fbm(p + vec3(noiseVal + uTime * 0.1));
        
        // Color Mixing
        vec3 finalColor = mix(uColor1, uColor2, smoothstep(0.0, 0.8, q + mouseForce * 0.2));
        finalColor = mix(finalColor, uColor3, smoothstep(0.2, 1.0, noiseVal - mouseForce * 0.1));
        
        // Highlight mouse interaction area slightly
        finalColor += vec3(0.1) * mouseForce;

        float grain = fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453) * 0.05;
        gl_FragColor = vec4(finalColor + grain, 1.0);
    }
`;

export default function FluidBackground({
    config = { stiffness: 50, damping: 20, mass: 1 },
    colors = { color1: '#6D28D9', color2: '#00FF9C', color3: '#2563EB' },
    speed = 0.1,
    force = 0.8,
    grainOpacity = 0.14,
    blurStrength = 120,
    debug = false
}: FluidBackgroundProps & { speed?: number; force?: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<any>(null);
    const programRef = useRef<any>(null);
    const mouseRef = useRef(new Vec2(0.5, 0.5));
    const targetMouseRef = useRef(new Vec2(0.5, 0.5));

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 1. Setup OGL
        const renderer = new Renderer({ alpha: false, dpr: Math.min(window.devicePixelRatio, 2) });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 1);
        container.appendChild(gl.canvas);
        rendererRef.current = renderer;

        const camera = new Camera(gl);
        camera.position.z = 1;

        // 2. Setup Resize
        function resize() {
            renderer.setSize(container!.offsetWidth, container!.offsetHeight);
            if (programRef.current) {
                programRef.current.uniforms.uResolution.value.set(renderer.width, renderer.height);
            }
        }
        window.addEventListener('resize', resize);
        resize();

        // 4. Create Program using Manual Geometry
        const geometry = new Geometry(gl, {
            position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
            uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
        });

        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                uTime: { value: 0 },
                uColor1: { value: new Color(colors.color1) },
                uColor2: { value: new Color(colors.color2) },
                uColor3: { value: new Color(colors.color3) },
                uMouse: { value: new Vec2(0.5, 0.5) },
                uResolution: { value: new Vec2(renderer.width, renderer.height) },
                uFlowSpeed: { value: speed },
                uInteractionStrength: { value: force }
            },
        });
        programRef.current = program;

        const mesh = new Mesh(gl, { geometry, program });

        // 5. Interaction Listeners
        function updateMouse(e: MouseEvent) {
            targetMouseRef.current.x = e.clientX / window.innerWidth;
            targetMouseRef.current.y = 1.0 - (e.clientY / window.innerHeight);
        }
        window.addEventListener('mousemove', updateMouse);

        // 6. Animation Loop
        let animationId: number;
        function update(t: number) {
            animationId = requestAnimationFrame(update);

            // Safety check
            if (!rendererRef.current || !containerRef.current) return;

            const time = t * 0.001;

            // Physics LERP - derived from config for responsiveness
            // stiffness 10-200 -> lerp 0.01 - 0.2
            const lerpFactor = Math.max(0.01, Math.min(0.5, config.stiffness * 0.002));
            mouseRef.current.lerp(targetMouseRef.current, lerpFactor);

            program.uniforms.uTime.value = time;
            program.uniforms.uMouse.value.copy(mouseRef.current);
            renderer.render({ scene: mesh, camera });
        }
        animationId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', updateMouse);
            cancelAnimationFrame(animationId);
            rendererRef.current = null;
            if (container && gl.canvas.parentNode === container) {
                container.removeChild(gl.canvas);
            }
        };
    }, [config]); // Re-init if config physics changes significantly effectively

    // Dynamic Updates for uniforms
    useEffect(() => {
        if (programRef.current) {
            programRef.current.uniforms.uColor1.value.set(colors.color1);
            programRef.current.uniforms.uColor2.value.set(colors.color2);
            programRef.current.uniforms.uColor3.value.set(colors.color3);
            programRef.current.uniforms.uFlowSpeed.value = speed;
            programRef.current.uniforms.uInteractionStrength.value = force;
        }
    }, [colors, speed, force]);

    return (
        <div ref={containerRef} className="fixed inset-0 w-full h-full -z-10" />
    );
}
