'use client';

import { motion } from 'framer-motion';
import { Layout, Zap, Bot } from 'lucide-react';
import Image from 'next/image';

export const CampaignPipeline = () => {
    return (
        <div className="bg-zinc-950/50 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
                <h2 className="flex items-center gap-2 font-display font-bold text-white uppercase tracking-wider">
                    <Layout className="w-4 h-4 text-[#00FF9C]" />
                    ACTIVE_PIPELINE
                </h2>
                <button className="text-[10px] font-mono text-[#00FF9C] hover:underline uppercase tracking-widest bg-[#00FF9C]/5 px-3 py-1 rounded-full border border-[#00FF9C]/20 transition-all hover:bg-[#00FF9C]/10">
                    Deploy_New_Campaign +
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Campaign 1: Blueprint Visual */}
                <motion.div
                    whileHover={{ y: -4 }}
                    className="group relative rounded-xl overflow-hidden border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
                >
                    <div className="aspect-video relative overflow-hidden">
                        <Image
                            src="/assets/purrpurr_social_campaign_blueprint.png"
                            alt="Campaign Blueprint"
                            fill
                            className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 scale-105 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0033] via-[#0f0033]/40 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                            <div className="text-[10px] font-mono text-emerald-500 mb-1 font-bold tracking-widest bg-emerald-500/10 w-fit px-2 rounded">DESIGNING_FUNNEL...</div>
                            <h4 className="font-bold text-white text-base">Campaña: Labs Launch</h4>
                        </div>
                    </div>
                    <div className="p-4 space-y-3">
                        <p className="text-xs text-zinc-400 font-mono leading-relaxed">Presentando la infraestructura detrás de la magia.</p>
                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                            <div className="flex -space-x-2">
                                <div className="w-7 h-7 rounded-full border-2 border-zinc-950 bg-[#8f69ff] flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="w-7 h-7 rounded-full border-2 border-zinc-950 bg-[#00FF9C] flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-zinc-950" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[85%]" />
                                </div>
                                <span className="text-[10px] font-mono text-emerald-500 font-bold">85%</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Campaign 2: Placeholder/Planning */}
                <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02] space-y-4 opacity-70 grayscale hover:grayscale-0 transition-all flex flex-col justify-center items-center text-center border-dashed group">
                    <div className="p-4 rounded-full bg-zinc-500/10 border border-zinc-500/20 mb-2 group-hover:bg-[#8f69ff]/10 group-hover:border-[#8f69ff]/30 transition-colors">
                        <Zap className="w-6 h-6 text-zinc-500 group-hover:text-[#8f69ff] transition-colors" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm mb-1 text-zinc-300">NEXT_MODULE: AUTOMATION_AWARENESS</h4>
                        <p className="text-[10px] text-zinc-500 font-mono max-w-[200px]">Waiting for performance data from current campaign.</p>
                    </div>
                    <button className="mt-4 px-6 py-2 border border-white/10 rounded-full text-[10px] font-mono text-zinc-400 hover:bg-white/5 hover:text-[#00FF9C] hover:border-[#00FF9C]/30 transition-all uppercase tracking-widest">
                        INITIALIZE_DRAFT
                    </button>
                </div>
            </div>
        </div>
    );
};
