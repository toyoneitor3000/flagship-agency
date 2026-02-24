import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { readdir, stat } from 'fs/promises';
import path from 'path';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.email || session.user.role !== 'ADMIN') {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        let files: string[] = [];

        try {
            files = await readdir(uploadDir);
        } catch (dirErr) {
            // If directory doesn't exist, it means no files have been uploaded yet
            console.warn('Uploads directory not found or cannot be read:', dirErr);
            return NextResponse.json({ files: [] });
        }

        const fileDetails = await Promise.all(
            files.map(async (filename) => {
                const filePath = path.join(uploadDir, filename);
                try {
                    const fileStat = await stat(filePath);
                    if (fileStat.isFile()) {
                        return {
                            name: filename,
                            url: `/uploads/${filename}`,
                            size: fileStat.size,
                            createdAt: fileStat.birthtime.toISOString() // Using birthtime as creation time
                        };
                    }
                } catch (statErr) {
                    console.error(`Error reading stats for file ${filename}:`, statErr);
                }
                return null;
            })
        );

        // Filter out nulls (directories or failed stats) and sort by newest first
        const validFiles = fileDetails
            .filter((f): f is NonNullable<typeof f> => f !== null)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json({
            files: validFiles
        });

    } catch (error: any) {
        console.error('Error fetching admin files:', error);
        return NextResponse.json({
            error: 'Error interno del servidor al obtener los archivos',
            details: error.message
        }, { status: 500 });
    }
}
