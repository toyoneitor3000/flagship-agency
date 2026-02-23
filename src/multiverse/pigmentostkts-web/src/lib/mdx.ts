import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type PostMeta = {
    title: string;
    description: string;
    date: string;
    category: string;
    author: string;
    coverImage?: string;
    slug: string;
};

// Ubicación de los archivos MDX de la Wiki
const rootDirectory = path.join(process.cwd(), 'src', 'content', 'wiki');

export const getPostBySlug = async (slug: string) => {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(rootDirectory, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return null; // El artículo no existe
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return { meta: { ...data, slug: realSlug } as PostMeta, content };
};

export const getAllPostsMeta = async () => {
    if (!fs.existsSync(rootDirectory)) {
        return [];
    }

    const files = fs.readdirSync(rootDirectory);
    const posts = files.map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fileContents = fs.readFileSync(
            path.join(rootDirectory, fileName),
            'utf8'
        );
        const { data } = matter(fileContents);

        return { ...data, slug } as PostMeta;
    });

    // Ordenar por fecha descendente
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
