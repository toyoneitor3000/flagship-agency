'use server';

import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const REGISTRY_PATH = path.join(process.cwd(), 'src', 'data', 'multiverse-registry.json');

export async function createMultiversePlanet(name: string, description: string, color: string) {
    console.log('🪐 Genesis Protocol Initiated:', name);

    try {
        // 1. Generate Slug
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        // 2. Define Paths
        const projectPath = path.join(process.cwd(), 'src', 'app', 'purrpurr', 'multiverse', slug);

        // 3. Load or Init Registry
        let registry: any[] = [];
        try {
            const fileContent = await fs.readFile(REGISTRY_PATH, 'utf-8');
            registry = JSON.parse(fileContent);
        } catch (e) {
            // If file doesn't exist, start empty (or could seed with current hardcoded ones if needed)
            registry = [];
        }

        // Check for duplicates
        if (registry.find((p: any) => p.slug === slug)) {
            return { success: false, error: 'Planet already exists in this sector.' };
        }

        // 4. Create New Planet Data
        const newPlanet = {
            id: `p-${Date.now()}`,
            name,
            slug,
            description,
            color,
            productionUrl: null, // New projects start without URLs
            localUrl: `/purrpurr/multiverse/${slug}`, // Internal routing
            framework: 'Next.js',
            status: 'development' as const,
            type: 'startup' as const,
            buildingLevels: 1, // Start as a small asteroid/station
            isSelf: false
        };

        // 5. Save to Registry
        registry.push(newPlanet);
        // Ensure directory for data exists
        await fs.mkdir(path.dirname(REGISTRY_PATH), { recursive: true });
        await fs.writeFile(REGISTRY_PATH, JSON.stringify(registry, null, 2));

        // 6. Scaffold Project Folder & Page
        await fs.mkdir(projectPath, { recursive: true });

        const pageContent = `
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PlanetPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-20 relative overflow-hidden">
        {/* Background Atmosphere */}
        <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
                background: \`radial-gradient(circle at 50% 50%, ${color}, transparent 70%)\`
            }}
        />

        <Link href="/purrpurr/multiverse" className="relative z-10 inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12">
            <ArrowLeft className="w-4 h-4" /> Volver al Multiverso
        </Link>
      
        <div className="relative z-10 max-w-4xl">
            <h1 className="text-7xl font-black tracking-tighter mb-6" style={{ color: '${color}' }}>${name}</h1>
            <p className="text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl">${description}</p>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">Estado del Proyecto</h3>
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_#f59e0b]" />
                        <span className="text-xl font-bold">En Desarrollo</span>
                    </div>
                </div>
                
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                    <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-2">Tecnología</h3>
                    <div className="font-mono text-xl">React / Next.js Framework</div>
                </div>
            </div>

            <div className="mt-12 p-8 rounded-3xl border border-dashed border-white/20 bg-white/[0.02]">
                <p className="text-center text-zinc-500 font-mono text-sm">
                    🚀 Entorno listo. Comienza a editar <span className="text-white">src/app/purrpurr/multiverse/${slug}/page.tsx</span>
                </p>
            </div>
        </div>
    </div>
  );
}
`;
        await fs.writeFile(path.join(projectPath, 'page.tsx'), pageContent.trim());

        // 7. Revalidate
        revalidatePath('/purrpurr/multiverse');

        return { success: true, planet: newPlanet };

    } catch (error) {
        console.error('Genesis Error:', error);
        return { success: false, error: 'Failed to terraform sector.' };
    }
}

export async function getMultiverseRegistry() {
    try {
        const fileContent = await fs.readFile(REGISTRY_PATH, 'utf-8');
        return JSON.parse(fileContent);
    } catch (e) {
        return [];
    }
}
