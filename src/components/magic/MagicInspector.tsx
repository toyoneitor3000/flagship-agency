'use client';

import React, { useState, useEffect } from 'react';
import { useMagic } from './MagicContext';
import { Code, Monitor, X, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const MagicInspector = () => {
    const { isGodMode } = useMagic();
    const [active, setActive] = useState(false);
    const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
    const [selectedSource, setSelectedSource] = useState<{ path: string; line: number; componentName?: string } | null>(null);
    const [codeContent, setCodeContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // React Fiber traversal to find source
    const getFiberFromElement = (dom: any) => {
        const key = Object.keys(dom).find(key => key.startsWith('__reactFiber$'));
        return key ? dom[key] : null;
    };

    const getComponentName = (fiber: any) => {
        const type = fiber.type;
        if (typeof type === 'function') return type.displayName || type.name;
        if (typeof type === 'object' && type) return type.displayName || (type.render ? type.render.name : 'Unknown');
        if (typeof type === 'string') return type;
        return 'Anonymous';
    };

    const findSourceInFiber = (fiber: any): { fileName: string; lineNumber: number; componentName?: string } | null => {
        let curr = fiber;
        let depth = 0;
        const candidates: any[] = [];

        // Traverse up
        while (curr && depth < 50) {
            depth++;

            const directSource = curr._debugSource;
            const ownerSource = curr._debugOwner?._debugSource;
            const name = getComponentName(curr);

            // Collect metadata
            candidates.push({
                source: directSource || ownerSource,
                name: name,
                fiber: curr
            });

            curr = curr.return;
        }

        console.log('FIBER TRAVERSAL RESULT:', candidates);

        // STRATEGY 1: Exact File Match in /src/
        const srcMatch = candidates.find(c => c.source && c.source.fileName.includes('/src/') && !c.source.fileName.includes('node_modules'));
        if (srcMatch) {
            return {
                fileName: srcMatch.source.fileName,
                lineNumber: srcMatch.source.lineNumber,
                componentName: srcMatch.name
            };
        }

        // STRATEGY 2: Component Name Hunt (Code Hunter)
        // Filter for valid custom components
        const validComponents = candidates.filter(c =>
            c.name &&
            /^[A-Z]/.test(c.name) && // Starts with Uppercase
            c.name !== 'Anonymous' &&
            c.name !== 'Unknown' &&
            !c.name.includes('Connect') && // Redux wrappers
            !c.name.includes('Provider') && // Context wrappers
            !c.name.includes('Motion') // Animation wrappers
        );

        // Smart Selection: Prefer the component using MagicText (the parent) over MagicText itself
        // This allows seeing 'Hero.tsx' instead of 'MagicText.tsx' when clicking text
        const targetComponent = validComponents.find(c => c.name !== 'MagicText') || validComponents[0];

        if (targetComponent) {
            console.log('🔎 Code Hunter: Identifying component by name...', targetComponent.name);
            return {
                fileName: 'SEARCH',
                lineNumber: 1, // Start at top
                componentName: targetComponent.name
            };
        }

        // STRATEGY 3: Desperation (Any file not in node_modules)
        const anyFile = candidates.find(c => c.source && !c.source.fileName.includes('node_modules'));
        if (anyFile) {
            return {
                fileName: anyFile.source.fileName,
                lineNumber: anyFile.source.lineNumber,
                componentName: anyFile.name
            };
        }

        return null; // Truly nothing found
    };

    // Hover effect
    useEffect(() => {
        if (!isGodMode || !active) {
            setHoveredElement(null);
            return;
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('#magic-inspector-ui')) return;
            e.stopPropagation();
            setHoveredElement(target);
        };

        const handleClick = async (e: MouseEvent) => {
            if (!hoveredElement) return;
            if ((e.target as HTMLElement).closest('#magic-inspector-ui')) return;

            e.preventDefault();
            e.stopPropagation();

            const fiber = getFiberFromElement(hoveredElement);
            if (fiber) {
                const source = findSourceInFiber(fiber);
                if (source) {
                    setSelectedSource({ path: source.fileName, line: source.lineNumber, componentName: source.componentName });
                    // Pass the text content of the element to refine the search.
                    // We take a safe substring to avoid huge text blocks.
                    const elementText = hoveredElement.textContent?.substring(0, 50) || '';
                    await fetchCode(source.fileName, source.lineNumber, source.componentName, elementText);
                } else {
                    const keys = Object.keys(hoveredElement).filter(k => k.startsWith('__react'));
                    alert(`Trace failed.\nTag: ${hoveredElement.tagName}\nFiber Keys: ${keys.join(', ')}\nTry clicking a child element directly.`);
                }
            } else {
                alert('FAIL: React Fiber data unreachable.');
            }
        };

        window.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('click', handleClick, true);

        return () => {
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('click', handleClick, true);
        };
    }, [isGodMode, active, hoveredElement]);

    const fetchCode = async (path: string, line: number, componentName?: string, searchText?: string) => {
        setLoading(true);
        try {
            const res = await fetch('/api/magic/source', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ filePath: path, lineNumber: line, componentName })
            });
            const data = await res.json();
            if (data.success) {
                setCodeContent(data.content);

                let finalLine = line;

                // If we used Auto-Locate (SEARCH), try to refine the line number using text content
                if (path === 'SEARCH' && componentName && searchText) {
                    const lines = data.content.split('\n');
                    // Simple heuristic: search for the text. 
                    // We clean the text to avoid whitespace issues.
                    const cleanSearch = searchText.trim().substring(0, 20);
                    if (cleanSearch.length > 3) {
                        const foundLineIndex = lines.findIndex((l: string) => l.includes(cleanSearch));
                        if (foundLineIndex !== -1) {
                            finalLine = foundLineIndex + 1;
                        }
                    }
                    setSelectedSource({ path: `${componentName}.tsx (Auto-Located)`, line: finalLine, componentName });
                } else {
                    setSelectedSource(prev => prev ? ({ ...prev, line: finalLine }) : null);
                }
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    if (!isGodMode) return null;

    return (
        <>
            {/* Inspector Toggle */}
            <div className="fixed bottom-4 left-4 z-[9999]">
                <button
                    onClick={() => setActive(!active)}
                    className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold transition-all shadow-lg border",
                        active
                            ? "bg-indigo-600 border-indigo-400 text-white shadow-indigo-500/50"
                            : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-white"
                    )}
                >
                    <Code size={16} />
                    {active ? "X-RAY ACTIVE" : "ENABLE X-RAY"}
                </button>
            </div>

            {/* Hover Outline */}
            {active && hoveredElement && !selectedSource && (
                <div
                    className="fixed pointer-events-none z-[9998] border-2 border-indigo-500 bg-indigo-500/10 rounded"
                    style={{
                        top: hoveredElement.getBoundingClientRect().top,
                        left: hoveredElement.getBoundingClientRect().left,
                        width: hoveredElement.getBoundingClientRect().width,
                        height: hoveredElement.getBoundingClientRect().height,
                        transition: 'all 0.1s ease-out'
                    }}
                >
                    <span className="absolute -top-6 left-0 bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                        {hoveredElement.tagName.toLowerCase()}
                    </span>
                </div>
            )}

            {/* Code Viewer Panel */}
            <AnimatePresence>
                {selectedSource && (
                    <motion.div
                        id="magic-inspector-ui"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        className="fixed top-0 right-0 h-screen w-[600px] bg-zinc-950 border-l border-zinc-800 shadow-2xl z-[10000] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
                            <div>
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <Code size={16} className="text-indigo-500" />
                                    {selectedSource.componentName || 'Component'}
                                </h3>
                                <p className="text-[10px] text-zinc-500 font-mono truncate max-w-[400px]">
                                    {selectedSource.path.split('src/').pop()} :{selectedSource.line}
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    setSelectedSource(null);
                                    setCodeContent(null);
                                }}
                                className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Code Content */}
                        <div className="flex-grow overflow-auto p-0 bg-[#0d0d0d] font-mono text-xs leading-relaxed relative">
                            {loading ? (
                                <div className="absolute inset-0 flex items-center justify-center text-indigo-500">
                                    <Loader2 className="animate-spin" />
                                </div>
                            ) : (
                                <div className="p-4">
                                    {codeContent ? (
                                        <pre>
                                            {codeContent.split('\n').map((line, i) => {
                                                const lineNum = i + 1;
                                                const isTarget = lineNum === selectedSource.line;
                                                return (
                                                    <div
                                                        key={i}
                                                        id={`code-line-${lineNum}`}
                                                        className={cn(
                                                            "flex",
                                                            isTarget ? "bg-indigo-500/20 text-indigo-100 font-bold" : "text-zinc-400"
                                                        )}
                                                    >
                                                        <span className="w-8 shrink-0 text-zinc-700 select-none text-right pr-3 opacity-50">{lineNum}</span>
                                                        <span className="whitespace-pre-wrap break-all">{line}</span>
                                                    </div>
                                                );
                                            })}
                                        </pre>
                                    ) : (
                                        <p className="text-zinc-500 text-center mt-20">Could not read source file.</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer / Actions */}
                        <div className="p-4 border-t border-zinc-800 bg-zinc-900">
                            <p className="text-[10px] text-zinc-500 text-center">
                                Read-only mode. Full editor integration coming soon.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
