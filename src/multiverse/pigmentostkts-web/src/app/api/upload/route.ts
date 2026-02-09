import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No se subió ningún archivo' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Sanitize filename
        const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
        const filename = `${Date.now()}-${safeName}`;
        const relativePath = `/uploads/${filename}`;
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        const absolutePath = path.join(uploadDir, filename);

        // Ensure directory exists
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (dirErr) {
            console.error('Error creating upload directory:', dirErr);
        }

        await writeFile(absolutePath, buffer);

        console.log(`File uploaded successfully: ${filename} (${file.size} bytes)`);

        return NextResponse.json({
            success: true,
            fileUrl: relativePath,
            fileName: file.name
        });

    } catch (error: any) {
        console.error('Error uploading file:', error);

        // Handle specific error case (e.g. payload too large)
        if (error.message?.includes('too large') || error.http_status === 413) {
            return NextResponse.json({ error: 'El archivo es demasiado grande para ser procesado.' }, { status: 413 });
        }

        return NextResponse.json({
            error: 'Error al subir el archivo al servidor',
            details: error.message
        }, { status: 500 });
    }
}
