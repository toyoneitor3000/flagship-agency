'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface LivingAIEntityProps {
  className?: string;
  interactive?: boolean;
  intensity?: number;
  showStatusIndicator?: boolean;
}

export const LivingAIEntity: React.FC<LivingAIEntityProps> = ({
  className = '',
  interactive = true,
  intensity = 1.0,
  showStatusIndicator = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [systemActive, setSystemActive] = useState(true);

  // Shader sources
  const vsSource = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fsSource = `
    precision highp float;
    
    uniform vec2 uResolution;
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uMouseVelocity;
    uniform float uIsMobile;
    uniform float uIntensity;

    // Fast noise / hash
    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    void main() {
      // Coordinate normalization with aspect ratio preservation
      vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
      
      // Center position: shifted to the right on desktop to leave hero text pristine
      // Centered on mobile with subtle upward offset
      vec2 center = vec2(mix(0.40, 0.0, uIsMobile), mix(-0.02, 0.08, uIsMobile));
      vec2 p = uv - center;
      
      // 1. DYNAMIC WIND SIMULATION ("moldeada por el viento")
      // Primary atmospheric wind currents flowing organically
      float windTime = uTime * 0.42;
      vec2 wind = vec2(
        sin(windTime + p.y * 2.4) * 0.35 + sin(windTime * 1.6 + p.x * 3.0) * 0.16,
        cos(windTime * 0.85 + p.x * 2.2) * 0.26 + cos(windTime * 1.4 - p.y * 2.6) * 0.12
      );
      
      // Interactive mouse wake (touch / cursor pushes and curls the wind)
      vec2 mouseNorm = (uMouse * uResolution - 0.5 * uResolution) / min(uResolution.x, uResolution.y);
      vec2 mouseDiff = p - (mouseNorm - center);
      float mouseDist = length(mouseDiff);
      vec2 mouseWake = normalize(mouseDiff + 0.0001) * exp(-mouseDist * 3.4) * uMouseVelocity * 1.1;
      
      vec2 totalWind = wind + mouseWake;
      
      // Coordinates deformed by fluid wind turbulence
      vec2 windP = p + totalWind * 0.38;
      float r = length(windP);
      float theta = atan(windP.y, windP.x);
      
      // 2. LIVING CONSCIOUS PULSE ("como una entidad viva, el bot operativo")
      // Natural respiration / resting breathing rhythm (~0.18 Hz)
      float breath = 1.0 + 0.075 * sin(uTime * 1.25) + 0.03 * sin(uTime * 2.6);
      
      // Neural pulse wave traveling through ribbons (active processing shockwave)
      float pulsePhase = fract(uTime * 0.22);
      float pulseWave = exp(-pow((r - pulsePhase * 1.25) * 5.2, 2.0)) * 0.5;
      
      // 3. MULTI-LAYER CHROMATIC IRIDESCENT RIBBONS (Siri / Windows Bloom aesthetic)
      vec3 accumColor = vec3(0.0);
      float accumAlpha = 0.0;
      
      // Purrpurr signature chromatic palette
      vec3 cViolet  = vec3(0.56, 0.41, 1.00); // Purrpurr brand violet #8f69ff
      vec3 cIndigo  = vec3(0.28, 0.22, 0.90); // Electric deep indigo #4737e6
      vec3 cMagenta = vec3(0.92, 0.24, 0.84); // Neon fuchsia / orchid #eb3dd6
      vec3 cCyan    = vec3(0.18, 0.82, 0.98); // Electric cyan caustic #2ed1fa
      vec3 cTeal    = vec3(0.00, 0.96, 0.76); // High-tech mint/teal #00f5c2
      vec3 cWhite   = vec3(0.98, 0.98, 1.00); // Incandescent filament white
      
      // Generate 7 interlaced, undulating ribbon folds
      for (int i = 0; i < 7; i++) {
        float fi = float(i);
        float phase = fi * 1.047; // 60-degree rotational offset
        float speed = 0.48 + fi * 0.11;
        
        // Multi-harmonic undulating wave equation
        float wave1 = sin(theta * (2.0 + fi * 0.55) + uTime * speed + wind.x * 2.6 + phase);
        float wave2 = cos(theta * (3.0 - fi * 0.35) - uTime * (speed * 0.75) + wind.y * 2.1);
        
        // Ribbon contour radius in polar space
        float ribbonRadius = (0.21 + fi * 0.072) * breath + wave1 * 0.115 + wave2 * 0.075;
        
        // Signed distance to ribbon contour
        float distToRibbon = abs(r - ribbonRadius);
        
        // Variable ribbon width (fluttering like silk in a breeze)
        float thickness = (0.042 + 0.024 * sin(theta * 3.2 + uTime * 0.9 + fi)) * (1.0 + wave1 * 0.22);
        
        // Antialiased silky ribbon density (proper edge0 < edge1 order)
        float ribbonFactor = clamp(1.0 - distToRibbon / max(thickness, 0.001), 0.0, 1.0);
        float ribbonAlpha = smoothstep(0.0, 1.0, ribbonFactor);
        
        // Razor-sharp Fresnel edge highlight (infinitely crisp at retina resolutions)
        float edgeGlow = pow(ribbonFactor, 3.2);
        
        // Iridescent chromatic shift across folds and angle
        float colorT = fract((fi / 7.0) + (theta / 6.28318) * 0.45 + uTime * 0.045 + totalWind.x * 0.18);
        
        vec3 ribbonColor;
        if (colorT < 0.25) {
          ribbonColor = mix(cViolet, cIndigo, colorT / 0.25);
        } else if (colorT < 0.50) {
          ribbonColor = mix(cIndigo, cMagenta, (colorT - 0.25) / 0.25);
        } else if (colorT < 0.75) {
          ribbonColor = mix(cMagenta, cCyan, (colorT - 0.50) / 0.25);
        } else {
          ribbonColor = mix(cCyan, cViolet, (colorT - 0.75) / 0.25);
        }
        
        // Add incandescent razor edge and operational pulse
        ribbonColor += cWhite * edgeGlow * 0.85;
        ribbonColor += cCyan * pulseWave * 0.55;
        
        // Volumetric accumulation with light transmission
        float layerWeight = ribbonAlpha * (0.42 + 0.38 * edgeGlow);
        accumColor += ribbonColor * layerWeight * (1.0 - accumAlpha * 0.5);
        accumAlpha += layerWeight * 0.55;
      }
      
      // 4. LIVING BOT CORE (Nucleus of the operational intelligence)
      float coreDist = length(p + totalWind * 0.12);
      float coreVolumetric = exp(-coreDist * 3.8) * (1.2 + 0.25 * sin(uTime * 2.4));
      float innerFilament = exp(-coreDist * 10.0) * (1.8 + 0.35 * sin(uTime * 3.8));
      
      vec3 coreColor = mix(cViolet, cCyan, sin(uTime * 1.5 + r * 5.0) * 0.5 + 0.5);
      accumColor += coreColor * coreVolumetric * 0.85;
      accumColor += cWhite * innerFilament * 0.95;
      
      // 5. DRIFTING NEURAL PARTICLES / MICRO-DATA STREAMS
      // Sparks caught in the wind vortex around the bot
      for (int k = 0; k < 6; k++) {
        float fk = float(k);
        float pAngle = uTime * (0.35 + fk * 0.08) + fk * 1.047;
        float pRadius = (0.24 + fk * 0.1) * breath + 0.06 * sin(uTime * 1.5 + fk);
        vec2 pPos = vec2(cos(pAngle), sin(pAngle)) * pRadius + wind * 0.22;
        float pDist = length(p - pPos);
        float spark = exp(-pDist * 48.0) * (0.7 + 0.3 * sin(uTime * 5.0 + fk));
        accumColor += mix(cCyan, cTeal, fract(fk * 0.33)) * spark * 1.1;
      }
      
      // 6. AMBIENT AURA & BACKGROUND INTEGRATION
      // Soft ambient radiance spreading smoothly into the space
      float ambientAura = exp(-r * 2.2) * 0.35 * (1.0 + 0.15 * sin(uTime * 0.9));
      accumColor += cViolet * ambientAura;
      
      // Base background color: Deep obsidian violet #050011
      vec3 bg = vec3(0.0196, 0.0, 0.0667);
      
      // Final compositing with smooth alpha falloff
      vec3 finalColor = mix(bg, accumColor, clamp(accumAlpha * 1.35 + coreVolumetric * 0.6, 0.0, 1.0));
      
      // Smooth organic falloff for text contrast on the left (wide and continuous, avoiding any harsh edges)
      float textProtection = smoothstep(mix(-0.4, -0.15, uIsMobile), mix(0.45, 0.35, uIsMobile), uv.x);
      finalColor = mix(bg, finalColor, 0.25 + 0.75 * textProtection);
      
      // Outer screen vignette to blend seamlessly with adjacent sections
      float vignetteDist = length(uv * vec2(0.85, 1.0));
      float screenVignette = 1.0 - smoothstep(0.75, 1.6, vignetteDist);
      finalColor = mix(bg, finalColor, screenVignette);
      
      // Subtle analog dither to prevent 8-bit banding
      float dither = (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * (1.0 / 255.0);
      finalColor += dither;
      
      gl_FragColor = vec4(finalColor * uIntensity, 1.0);
    }
  `;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // High performance WebGL context
    const gl = (canvas.getContext('webgl2', {
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    }) ||
      canvas.getContext('webgl', {
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
      })) as WebGLRenderingContext | WebGL2RenderingContext | null;

    if (!gl) {
      console.warn('[LivingAIEntity] WebGL not supported, falling back to CSS.');
      return;
    }

    // Helper: Compile shader
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('[LivingAIEntity] Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('[LivingAIEntity] Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Full screen quad geometry
    const quadVertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, 'uResolution');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uMouse = gl.getUniformLocation(program, 'uMouse');
    const uMouseVelocity = gl.getUniformLocation(program, 'uMouseVelocity');
    const uIsMobile = gl.getUniformLocation(program, 'uIsMobile');
    const uIntensityLoc = gl.getUniformLocation(program, 'uIntensity');

    // Pointer state
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let mouseVel = 0;
    let lastMoveTime = performance.now();
    let prevMouseX = 0.5;
    let prevMouseY = 0.5;

    // Resize handler (Device Pixel Ratio aware for razor-sharp rendering)
    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5); // Up to 2.5x retina clarity
      const width = Math.max(Math.floor(rect.width * dpr), 320);
      const height = Math.max(Math.floor(rect.height * dpr), 320);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    
    // ResizeObserver for reliable container tracking across responsive layouts
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && container) {
      resizeObserver = new ResizeObserver(() => {
        resize();
      });
      resizeObserver.observe(container);
    }
    
    resize();

    // Pointer events
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      targetMouseX = (clientX - rect.left) / rect.width;
      targetMouseY = 1.0 - (clientY - rect.top) / rect.height;

      const now = performance.now();
      const dt = Math.max((now - lastMoveTime) / 1000, 0.001);
      const dist = Math.hypot(targetMouseX - prevMouseX, targetMouseY - prevMouseY);
      mouseVel = Math.min(dist / dt * 0.15, 2.0);

      prevMouseX = targetMouseX;
      prevMouseY = targetMouseY;
      lastMoveTime = now;
    };

    if (interactive) {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
      window.addEventListener('touchmove', handlePointerMove, { passive: true });
    }

    // Animation loop with pause on tab hide or when scrolled out of viewport
    let animationFrameId: number;
    let startTime = performance.now();
    let isVisible = true;
    let isInViewport = true;

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Stop rendering completely when section is not visible on screen to save 100% GPU/CPU
    let intersectionObserver: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined' && container) {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          isInViewport = entry ? entry.isIntersecting : true;
        },
        { threshold: 0.01 }
      );
      intersectionObserver.observe(container);
    }

    const render = (time: number) => {
      if (isVisible && isInViewport) {
        const elapsed = (time - startTime) * 0.001;

        // Smooth mouse inertia
        mouseX += (targetMouseX - mouseX) * 0.08;
        mouseY += (targetMouseY - mouseY) * 0.08;
        mouseVel *= 0.94; // Velocity decay

        const isMobile = window.innerWidth < 768 ? 1.0 : 0.0;

        gl.uniform2f(uResolution, canvas.width, canvas.height);
        gl.uniform1f(uTime, elapsed);
        gl.uniform2f(uMouse, mouseX, mouseY);
        gl.uniform1f(uMouseVelocity, mouseVel);
        gl.uniform1f(uIsMobile, isMobile);
        gl.uniform1f(uIntensityLoc, intensity);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      if (interactive) {
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('touchmove', handlePointerMove);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (intersectionObserver) {
        intersectionObserver.disconnect();
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      gl.deleteBuffer(vbo);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [interactive, intensity, fsSource]);

  useEffect(() => {
    if (!isClient) return;
    const cleanup = initWebGL();
    return cleanup;
  }, [isClient, initWebGL]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
    >
      {/* Siri / Living Orb Chromatic Fluid Aurora Underlay */}
      <div
        className="absolute top-1/2 right-[10%] lg:right-[15%] -translate-y-1/2 w-[500px] lg:w-[650px] h-[500px] lg:h-[650px] rounded-full blur-[110px] pointer-events-none opacity-50 mix-blend-screen animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(143,105,255,0.75) 0%, rgba(217,70,239,0.5) 40%, rgba(56,189,248,0.35) 70%, transparent 100%)',
          animationDuration: '7s',
        }}
      />
      <div
        className="absolute top-[42%] right-[18%] lg:right-[24%] -translate-y-1/2 w-[320px] lg:w-[420px] h-[320px] lg:h-[420px] rounded-full blur-[80px] pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.7) 0%, rgba(143,105,255,0.4) 60%, transparent 100%)',
        }}
      />

      {/* Real-time WebGL Canvas (Procedural, 60 FPS, Wind-molded living AI entity) */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block relative z-10"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Directional Soft Lighting & Contrast Enforcers (protects typography on the left) */}
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#050011]/90 via-[#050011]/35 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#050011]/85 via-transparent to-[#050011]/50 pointer-events-none" />

      {/* High-Tech Operational Telemetry Badge ("inteligencia artificial para la gestión operativa en vivo") */}
      {showStatusIndicator && (
        <div className="hidden lg:flex absolute bottom-12 right-16 z-30 items-center gap-3 px-4 py-2 rounded-full border border-violet-500/20 bg-[#0c0524]/60 backdrop-blur-xl shadow-[0_0_30px_rgba(143,105,255,0.15)] pointer-events-auto transition-all duration-300 hover:border-violet-500/40">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-zinc-400">NÚCLEO OPERATIVO:</span>
            <span className="text-violet-300 font-semibold tracking-wider">PURRPURR AI // EN VIVO</span>
          </div>
          <div className="w-[1px] h-3 bg-violet-500/30 ml-1" />
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
            60 FPS PROCEDURAL
          </span>
        </div>
      )}
    </div>
  );
};
