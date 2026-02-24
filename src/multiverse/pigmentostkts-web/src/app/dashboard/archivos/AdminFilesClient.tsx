"use client";

import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils"; // Contains useful formatting if needed, but we need date formatting mostly
import { motion } from "framer-motion";
import { FileCode, Download, ExternalLink, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

type UploadedFile = {
    name: string;
    url: string;
    size: number;
    createdAt: string;
};

export default function AdminFilesClient() {
    const [files, setFiles] = useState<UploadedFile[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch('/api/admin/archivos');
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Error al cargar archivos");
                }

                setFiles(data.files);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFiles();
    }, []);

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const isImage = (name: string) => {
        return /\.(jpg|jpeg|png|webp|gif)$/i.test(name);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-24 text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-brand-yellow" />
                <p>Cargando archivos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 mb-8">
                <h3 className="font-bold text-lg mb-2">Error</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (files.length === 0) {
        return (
            <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-100">
                <div className="mx-auto h-16 w-16 text-gray-200 mb-4 flex items-center justify-center">
                    <ImageIcon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No hay archivos subidos</h3>
                <p className="mt-2 text-sm text-gray-500">Los usuarios aún no han subido referencias para sus diseños.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {files.map((file, index) => (
                <motion.div
                    key={file.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all flex flex-col"
                >
                    {/* Preview Area */}
                    <div className="aspect-square bg-gray-50 relative border-b border-gray-100 flex items-center justify-center overflow-hidden">
                        {isImage(file.name) ? (
                            <img
                                src={file.url}
                                alt={file.name}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <FileCode className="w-16 h-16 text-gray-300" />
                        )}

                        {/* Hover Actions */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                            <a
                                href={file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
                                title="Abrir en nueva pestaña"
                            >
                                <ExternalLink className="w-5 h-5" />
                            </a>
                            <a
                                href={file.url}
                                download={file.name}
                                className="bg-brand-yellow hover:bg-yellow-400 text-black p-3 rounded-full transition-colors"
                                title="Descargar"
                            >
                                <Download className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="p-4 flex flex-col flex-1">
                        <h4 className="font-bold text-sm text-gray-900 truncate" title={file.name}>
                            {file.name}
                        </h4>
                        <div className="mt-auto pt-2 flex justify-between items-center text-xs text-gray-500">
                            <span>{formatSize(file.size)}</span>
                            <span>{new Date(file.createdAt).toLocaleDateString("es-ES")}</span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
