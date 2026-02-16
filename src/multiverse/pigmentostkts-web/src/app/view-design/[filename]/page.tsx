"use client";
// Force rebuild for Next.js 15 params fix


import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Download, ArrowLeft, ExternalLink, ShieldCheck, FileText, FileCode, Layers, Info } from "lucide-react";
import Navbar from "@/components/Navbar";

import { use } from "react";
// ... other imports

interface PageProps {
    params: Promise<{
        filename: string;
    }>;
}

export default function ViewDesignPage({ params }: PageProps) {
    const { filename } = use(params);
    const searchParams = useSearchParams();
    const externalUrl = searchParams.get("url");

    // Si no hay ?url=, revisamos si el filename es una llave de Uploadthing
    const isUTKey = !filename.includes('.') && filename.length > 20;
    const fileUrl = externalUrl || (isUTKey ? `https://utfs.io/f/${filename}` : `/uploads/${filename}`);

    // Obtenemos la extensión de forma más segura (solo lo que está después del último punto en el nombre del archivo)
    const urlParts = fileUrl.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    const extension = lastPart.includes('.') ? lastPart.split('.').pop()?.split('?')[0].toLowerCase() : 'unknown';

    // Determine content type
    const isPdf = extension === 'pdf';
    const isImage = ['png', 'jpg', 'jpeg', 'webp', 'svg', 'unknown'].includes(extension || '');
    const isAdobe = ['ai', 'psd'].includes(extension || '');

    return (
        <div className="min-h-screen bg-brand-gray flex flex-col">
            <Navbar />

            <main className="flex-grow pt-28 pb-12 px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-brand-black transition-colors uppercase tracking-widest"
                                >
                                    <ArrowLeft size={14} /> Volver
                                </Link>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-brand-black tracking-tighter uppercase">
                                Visualizador de Diseño
                            </h1>
                            <p className="text-gray-500 text-sm mt-1 max-w-xl">
                                {isAdobe ? 'Archivo de alta fidelidad detectado. Este formato requiere herramientas profesionales para su edición.' : 'Previsualización segura de tu archivo. Verifica que todo esté correcto antes de que pase a producción.'}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <a
                                href={fileUrl}
                                download={filename}
                                className="flex items-center gap-2 bg-brand-yellow text-brand-black px-6 py-3 rounded-xl font-black uppercase text-sm tracking-tight hover:bg-brand-black hover:text-white transition-all shadow-lg shadow-brand-yellow/20"
                            >
                                <Download size={18} /> Descargar Archivo
                            </a>
                        </div>
                    </div>

                    {/* Main Viewer Card */}
                    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 overflow-hidden flex flex-col">
                        {/* Toolbar */}
                        <div className="bg-gray-50/50 backdrop-blur-md px-8 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-wider">
                                    <ShieldCheck size={12} /> Archivo Verificado
                                </div>
                                <span className="text-[10px] text-gray-400 font-mono hidden sm:inline-block">
                                    {filename}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <a
                                    href={isPdf ? '#' : fileUrl}
                                    onClick={isPdf ? (e) => e.preventDefault() : undefined}
                                    target={isPdf ? undefined : "_blank"}
                                    rel="noopener noreferrer"
                                    className={`p-2 transition-colors ${isPdf ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-brand-black'}`}
                                    title={isPdf ? "Previsualización interna activa" : "Abrir en pestaña nueva"}
                                >
                                    <ExternalLink size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Content Container */}
                        <div className="relative min-h-[400px] md:min-h-[650px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] bg-gray-50 flex items-center justify-center p-4 md:p-8">
                            <div className="w-full h-full flex items-center justify-center">
                                {isPdf ? (
                                    <iframe
                                        src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                                        className="w-full h-[650px] rounded-lg shadow-2xl border-none"
                                        title="Previsualización PDF"
                                    />
                                ) : isImage ? (
                                    <img
                                        src={fileUrl}
                                        alt="Previsualización del diseño"
                                        className="max-w-full max-h-[70vh] object-contain shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-lg bg-white"
                                    />
                                ) : (
                                    <div className="text-center p-12 bg-white rounded-3xl shadow-xl border border-gray-100 max-w-lg w-full">
                                        <div className={`w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center ${extension === 'ai' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {extension === 'ai' ? <FileCode size={48} /> : <Layers size={48} />}
                                        </div>
                                        <h3 className="text-2xl font-black text-brand-black uppercase tracking-tight mb-2">
                                            Archivo de Diseño
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                                            Este es un formato de diseño profesional que no puede previsualizarse directamente en el navegador. <br /><strong>El archivo ha sido recibido correctamente.</strong>
                                        </p>
                                        <div className="bg-gray-50 rounded-2xl p-4 flex items-start gap-3 text-left border border-gray-100">
                                            <Info className="text-brand-black shrink-0 mt-0.5" size={18} />
                                            <p className="text-[11px] text-gray-500 font-medium">
                                                Para ver este diseño, usa el botón <strong>"Descargar Archivo"</strong> arriba y ábrelo con {extension === 'ai' ? 'Adobe Illustrator' : 'Adobe Photoshop'}.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer Details */}
                        <div className="p-8 md:p-10 bg-white grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-50">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tipo de Archivo</p>
                                <p className="text-sm font-bold text-brand-black">{extension === 'unknown' ? 'Documento' : extension?.toUpperCase()}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Estado de Carga</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <p className="text-sm font-bold text-brand-black">Sincronizado con Servidor</p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Recomendación</p>
                                <p className="text-sm font-bold text-brand-black">{isAdobe ? 'Formato Vectorial/Layered' : 'CMYK 300 DPI'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-gray-400 text-xs italic">
                            ¿Algo no se ve bien? Escríbenos por WhatsApp para ajustar tu diseño antes de imprimir.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
