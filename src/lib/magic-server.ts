import fs from 'fs/promises';
import path from 'path';

const CONTENT_PATH = path.join(process.cwd(), 'src/data/content.json');

export async function getMagicContent() {
    try {
        const data = await fs.readFile(CONTENT_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Failed to read magic content:', error);
        return {};
    }
}

export async function updateMagicContent(pathKey: string, value: string) {
    try {
        const content = await getMagicContent();

        // Simple deep merge/update logic setup
        const keys = pathKey.split('.');
        let current = content;

        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!current[key]) current[key] = {};
            current = current[key];
        }

        current[keys[keys.length - 1]] = value;

        await fs.writeFile(CONTENT_PATH, JSON.stringify(content, null, 2));
        return { success: true };
    } catch (error) {
        console.error('Failed to write magic content:', error);
        return { success: false, error };
    }
}
