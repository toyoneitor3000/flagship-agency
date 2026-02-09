import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
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

        const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
        const filename = `${Date.now()}-${safeName}`;
        const relativePath = `/uploads/${filename}`;
        const absolutePath = path.join(process.cwd(), 'public', 'uploads', filename);

        await writeFile(absolutePath, buffer);

        return NextResponse.json({
            success: true,
            fileUrl: relativePath,
            fileName: file.name
        });

    } catch (error) {
        console.error('Error uploading file:', error);
        return NextResponse.json({ error: 'Error al subir el archivo' }, { status: 500 });
    }
}
