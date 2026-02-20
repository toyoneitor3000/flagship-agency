'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, X, Download, Wand2, Loader2, Image as ImageIcon, Circle, Square, RectangleHorizontal, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Script from 'next/script';

type StickerFormat = 'contour' | 'circle' | 'square' | 'rect';

export default function StickerMaker() {
    const [image, setImage] = useState<string | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [format, setFormat] = useState<StickerFormat>('contour');
    const [isAiReady, setIsAiReady] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Check if AI is already loaded (e.g. from previous navigation)
    useEffect(() => {
        // @ts-ignore
        if (typeof window.imglyRemoveBackground !== 'undefined') {
            setIsAiReady(true);
        }
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            setError('La imagen es muy grande. El límite es 10MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setImage(event.target?.result as string);
            setProcessedImage(null);
            setError(null);
        };
        reader.readAsDataURL(file);
    };

    const processImage = async () => {
        if (!image) return;

        try {
            setIsProcessing(true);
            setProgress(10);
            setError(null);

            let sourceImageForBorder: HTMLImageElement;

            if (format === 'contour') {
                // 1. Remove background using AI (Global Script)

                if (!isAiReady) {
                    // Double check window just in case state didn't update yet
                    // @ts-ignore
                    if (typeof window.imglyRemoveBackground !== 'undefined') {
                        setIsAiReady(true);
                    } else {
                        throw new Error('La IA se está iniciando. Por favor espera unos segundos y vuelve a intentar.');
                    }
                }

                // @ts-ignore
                const blob = await window.imglyRemoveBackground(image, {
                    progress: (key: string, current: number, total: number) => {
                        const percent = Math.round((current / total) * 80);
                        setProgress(10 + percent);
                    }
                });

                const url = URL.createObjectURL(blob);
                sourceImageForBorder = await loadImage(url);
            } else {
                // 2. Geometric Crop (Circle, Square, Rect)
                setProgress(50);
                const originalImg = await loadImage(image);
                const croppedUrl = cropToShape(originalImg, format);
                sourceImageForBorder = await loadImage(croppedUrl);
            }

            setProgress(90);
            addWhiteBorder(sourceImageForBorder);
            setIsProcessing(false);
            setProgress(100);

        } catch (err) {
            console.error('Error processing image:', err);
            const errorMessage = err instanceof Error ? err.message : String(err);
            setError(`Error: ${errorMessage}`);
            setIsProcessing(false);
        }
    };

    const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    };

    const cropToShape = (img: HTMLImageElement, shape: StickerFormat): string => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return '';

        const size = Math.min(img.width, img.height);

        if (shape === 'rect') {
            canvas.width = img.width;
            canvas.height = img.height;
        } else {
            canvas.width = size;
            canvas.height = size;
        }

        const sx = (img.width - canvas.width) / 2;
        const sy = (img.height - canvas.height) / 2;

        if (shape === 'circle') {
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
        } else if (shape === 'square' || shape === 'rect') {
            const radius = Math.min(canvas.width, canvas.height) * 0.1;
            ctx.beginPath();
            if (ctx.roundRect) {
                ctx.roundRect(0, 0, canvas.width, canvas.height, radius);
            } else {
                ctx.rect(0, 0, canvas.width, canvas.height);
            }
            ctx.closePath();
            ctx.clip();
        }

        ctx.drawImage(img, sx, sy, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL('image/png');
    };

    const addWhiteBorder = (img: HTMLImageElement) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const borderThickness = Math.max(img.width, img.height) * 0.03;
        const padding = borderThickness * 2;

        canvas.width = img.width + padding * 2;
        canvas.height = img.height + padding * 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw white outline
        const steps = 36;
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 0;

        for (let i = 0; i < steps; i++) {
            const angle = (i * 2 * Math.PI) / steps;
            const x = Math.cos(angle) * borderThickness + padding;
            const y = Math.sin(angle) * borderThickness + padding;
            ctx.drawImage(img, x, y);
        }

        // Composite original on top
        ctx.shadowColor = 'transparent';
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(img, padding, padding);

        setProcessedImage(canvas.toDataURL('image/png'));
    };

    const downloadSticker = () => {
        if (!processedImage) return;
        const link = document.createElement('a');
        link.download = `pigmento-sticker-${format}.png`;
        link.href = processedImage;
        link.click();
    };

    const formats = [
        { id: 'contour', label: 'IA Mágica', icon: Sparkles },
        { id: 'circle', label: 'Círculo', icon: Circle },
        { id: 'square', label: 'Cuadrado', icon: Square },
        { id: 'rect', label: 'Original', icon: RectangleHorizontal },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
                {/* Load imgly global script with state tracking */}
                <Script
                    src="https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.5.5/dist/imgly-background-removal.min.js"
                    strategy="lazyOnload"
                    onLoad={() => {
                        console.log('IA Library Loaded');
                        setIsAiReady(true);
                    }}
                    onError={(e) => {
                        console.error('Error loading IA library', e);
                        setError('No se pudo cargar la librería de IA. Revisa tu conexión.');
                    }}
                />

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500 to-violet-600 mb-6 shadow-lg shadow-pink-500/20">
                        <Wand2 className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-4">
                        Creador de Stickers
                    </h1>
                    <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
                        IA Mágica o Formas Geométricas. Tú eliges el estilo.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 min-h-[500px]">

                    {/* Controls & Upload (Left) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">

                        {/* Format Selection */}
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                            <h3 className="text-white/80 font-medium mb-3 text-sm uppercase tracking-wider">Formato</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {formats.map((f) => (
                                    <button
                                        key={f.id}
                                        onClick={() => setFormat(f.id as StickerFormat)}
                                        className={cn(
                                            "flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 gap-2",
                                            format === f.id
                                                ? "bg-pink-500/20 border-pink-500 text-white"
                                                : "bg-black/20 border-transparent text-white/50 hover:bg-white/10 hover:text-white"
                                        )}
                                    >
                                        <f.icon className="w-6 h-6" />
                                        <span className="text-xs font-medium">{f.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Upload Area */}
                        <div className="flex-1 min-h-[200px] relative group">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                disabled={isProcessing}
                            />
                            <div className={cn(
                                "w-full h-full rounded-2xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-6",
                                image ? "border-white/20 bg-black/20" : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-pink-500/50"
                            )}>
                                {image ? (
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <img src={image} alt="Original" className="max-w-full max-h-[200px] object-contain rounded-lg shadow-xl" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                            <p className="text-white font-medium flex items-center gap-2">
                                                <ImageIcon className="w-5 h-5" /> Cambiar
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center space-y-4">
                                        <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center">
                                            <Upload className="w-6 h-6 text-white/50" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">Sube tu imagen</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <Button
                            onClick={processImage}
                            disabled={!image || isProcessing || (format === 'contour' && !isAiReady)}
                            className={cn(
                                "w-full h-14 text-lg font-bold uppercase tracking-wide transition-all duration-300",
                                (!image || isProcessing || (format === 'contour' && !isAiReady))
                                    ? "bg-white/5 text-white/20"
                                    : "bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white shadow-xl shadow-pink-500/20"
                            )}
                        >
                            {isProcessing ? (
                                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Procesando...</>
                            ) : format === 'contour' && !isAiReady ? (
                                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Cargando IA...</>
                            ) : (
                                <><Wand2 className="w-5 h-5 mr-2" /> Crear Sticker</>
                            )}
                        </Button>

                        {error && (
                            <p className="text-red-400 text-xs text-center bg-red-400/10 p-2 rounded">{error}</p>
                        )}
                    </div>

                    {/* Result (Right) */}
                    <div className="lg:col-span-8 flex flex-col">
                        <div className="flex-1 rounded-3xl border border-white/10 bg-[#151515] relative overflow-hidden flex items-center justify-center p-8 min-h-[400px]">
                            <div className="absolute inset-0 opacity-20"
                                style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
                            </div>

                            <AnimatePresence mode="wait">
                                {processedImage ? (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        className="relative z-10"
                                    >
                                        <img src={processedImage} alt="Sticker Result" className="max-w-full max-h-[500px] object-contain drop-shadow-2xl" />
                                    </motion.div>
                                ) : isProcessing ? (
                                    <div className="flex flex-col items-center justify-center z-10 text-center">
                                        <div className="relative w-24 h-24 mb-6">
                                            <motion.div
                                                className="absolute inset-0 rounded-full border-4 border-t-pink-500 border-r-transparent border-b-transparent border-l-transparent"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold">{progress}%</div>
                                        </div>
                                        <p className="text-white/70 font-medium">
                                            {format === 'contour' ? 'La IA está recortando tu imagen...' : 'Aplicando formato geométrico...'}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center z-10 opacity-20 select-none">
                                        <span className="text-8xl block mb-4">✨</span>
                                        <p className="text-xl font-medium tracking-tight">Tu sticker aparecerá aquí</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <Button
                                onClick={downloadSticker}
                                disabled={!processedImage}
                                size="lg"
                                className="bg-white text-black hover:bg-brand-yellow hover:text-black font-bold disabled:opacity-50 disabled:bg-white/10 disabled:text-white/20"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Descargar Sticker
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Hidden Canvas */}
                <canvas ref={canvasRef} className="hidden" />
            </div>
        </div>
    );
}
