
'use client';

import { useState } from 'react';
import { GitCommit, Send, Loader2, CheckCircle2 } from 'lucide-react';

export function SystemBroadcaster() {
    const [message, setMessage] = useState('');
    const [link, setLink] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleBroadcast = async () => {
        if (!message.trim()) return;

        setIsSending(true);
        try {
            const res = await fetch('/api/admin/broadcast', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, link }),
            });

            if (res.ok) {
                const data = await res.json();
                setIsSent(true);
                // Simple visual feedback instead of toast

                // Reset after 3 seconds
                setTimeout(() => {
                    setIsSent(false);
                    setMessage('');
                    setLink('');
                }, 3000);
            } else {
                alert("Error al enviar la notificación.");
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
                <GitCommit className="w-5 h-5 text-orange-400" />
                <h2 className="text-xl font-semibold text-white">Publicar Actualización</h2>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-mono text-zinc-500 mb-1 uppercase">Mensaje de la Actualización</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ej: Hemos mejorado la velocidad de carga..."
                        className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-200 focus:outline-none focus:border-orange-500/50 min-h-[80px]"
                    />
                </div>

                <div>
                    <label className="block text-xs font-mono text-zinc-500 mb-1 uppercase">Enlace (Opcional)</label>
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="https://github.com/..."
                        className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-200 focus:outline-none focus:border-orange-500/50"
                    />
                </div>

                <button
                    onClick={handleBroadcast}
                    disabled={isSending || !message.trim() || isSent}
                    className={`w-full py-3 rounded-lg font-bold text-sm uppercase tracking-wide transition-all flex items-center justify-center gap-2
                        ${isSent
                            ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                            : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-900/20'
                        }
                        ${(isSending || !message.trim()) && !isSent ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                >
                    {isSending ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Enviando...
                        </>
                    ) : isSent ? (
                        <>
                            <CheckCircle2 className="w-4 h-4" />
                            Enviado con Éxito
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            Notificar a Usuarios
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
