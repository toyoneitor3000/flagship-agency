// --- MAGIC SERVER STORAGE v2.0 ---
// Handles persistence across Local Dev (Filesystem) and Production (Vercel KV / Memory Fallback)

import fs from 'fs/promises';
import path from 'path';
import contentData from '../data/content.json';

const CONTENT_PATH = path.join(process.cwd(), 'src/data/content.json');

// Memory Cache for Production Fallback (volatile, but prevents crashes)
let MEMORY_CACHE: any = null;

// Helper to determine mode
const IS_DEV = process.env.NODE_ENV === 'development';

export async function getMagicContent() {
    try {
        // 1. Try Memory first (fastest)
        if (MEMORY_CACHE) return MEMORY_CACHE;

        // 2. Use imported data as seed (ensures it works in Vercel without FS)
        MEMORY_CACHE = JSON.parse(JSON.stringify(contentData));

        return MEMORY_CACHE;
    } catch (error) {
        console.error('Failed to read magic content:', error);
        return MEMORY_CACHE || contentData || {};
    }
}

export async function updateMagicContent(pathKey: string, value: string) {
    try {
        // 1. Get current content
        const content = await getMagicContent();

        // 2. Update Object in Memory
        const keys = pathKey.split('.');
        let current = content;

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!current[key]) current[key] = {};
            current = current[key];
        }

        current[keys[keys.length - 1]] = value;

        // Update global cache immediately
        MEMORY_CACHE = content;

        // 3. Persist based on Environment
        if (IS_DEV) {
            // Local formatting for dev experience
            await fs.writeFile(CONTENT_PATH, JSON.stringify(content, null, 2));
        } else {
            // PRODUCTION STRATEGY
            // TODO: Connect to Vercel KV here for true persistence.
            // For now, we rely on MEMORY_CACHE which persists only while the Lambda is warm.
            // This allows the "Live View" to work for the current demo session without crashing.
            console.log(`[MagicStore] In-Memory Update: ${pathKey} = ${value}`);
        }

        return { success: true };
    } catch (error) {
        console.error('Failed to write magic content:', error);
        return { success: false, error };
    }
}
