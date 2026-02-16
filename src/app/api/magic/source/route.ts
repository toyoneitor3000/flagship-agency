import { NextRequest, NextResponse } from 'next/server';

// NOTE: fs and path are dynamically imported in POST to avoid Vercel bundling the entire filesystem.


export async function POST(req: NextRequest) {
    // -------------------------------------------------------------------------
    // SECURITY & PERFORMANCE GUARD
    // -------------------------------------------------------------------------
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({
            success: false,
            error: 'Source Access Disabled: This API is for local development only.'
        }, { status: 403 });
    }

    try {
        // Dynamic imports to prevent Vercel form bundling the entire filesystem
        const fs = (await import('fs')).promises;
        const path = (await import('path')).default;

        const body = await req.json();
        const { filePath, lineNumber, lineCount = 20 } = body;

        if (!filePath) {
            return NextResponse.json({ success: false, error: 'File path required' }, { status: 400 });
        }

        const projectRoot = process.cwd();
        let targetPath = filePath;

        // Recursive helper defined inside to access dynamic modules
        async function findComponentFile(dir: string, componentName: string): Promise<string | null> {
            const entries = await fs.readdir(dir, { withFileTypes: true });

            // 1. Exact match check first in current dir
            for (const entry of entries) {
                if (entry.isFile()) {
                    const name = entry.name;
                    const nameNoExt = name.split('.')[0];
                    if (nameNoExt === componentName && (name.endsWith('.tsx') || name.endsWith('.ts') || name.endsWith('.jsx'))) {
                        return path.join(dir, name);
                    }
                }
            }

            // 2. Recursive search
            for (const entry of entries) {
                if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.next') {
                    const result = await findComponentFile(path.join(dir, entry.name), componentName);
                    if (result) return result;
                }
            }
            return null;
        }

        // --- SEARCH STRATEGY ---
        if (filePath === 'SEARCH' && body.componentName) {
            const foundPath = await findComponentFile(path.join(projectRoot, 'src'), body.componentName);
            if (foundPath) {
                targetPath = foundPath;
            } else {
                return NextResponse.json({ success: false, error: `Component ${body.componentName} not found in src/` }, { status: 404 });
            }
        }
        // -----------------------

        // Attempt to read
        try {
            const content = await fs.readFile(targetPath, 'utf-8');
            const lines = content.split('\n');

            let startLine = 0;
            let endLine = lines.length;

            if (lineNumber) {
                const center = lineNumber - 1; // 0-indexed
                const half = Math.floor(lineCount / 2);
                startLine = Math.max(0, center - half);
                endLine = Math.min(lines.length, center + half + 1);
            }

            const snippet = lines.join('\n'); // Return full file for now to give context, or efficient snippet

            return NextResponse.json({
                success: true,
                content: snippet,
                highlightCheck: lineNumber ? { start: startLine + 1, end: endLine } : null
            });

        } catch (readError) {
            console.error(readError);
            return NextResponse.json({ success: false, error: 'File not found' }, { status: 404 });
        }

    } catch (error) {
        return NextResponse.json({ success: false, error: 'Internal Error' }, { status: 500 });
    }
}
