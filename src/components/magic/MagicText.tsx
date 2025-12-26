'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useMagic } from './MagicContext';
import { cn } from '@/lib/utils';
import { Sparkles, Save } from 'lucide-react';

interface MagicTextProps {
    id: string; // The key in content.json, e.g., 'hero.title_1'
    defaultText: string;
    as?: React.ElementType; // The tag to render (h1, p, span)
    className?: string; // Additional classes
    placeholder?: string;
    [key: string]: any; // Allow other props
}

export const MagicText = ({
    id,
    defaultText,
    as: Component = 'span',
    className,
    placeholder,
    ...props
}: MagicTextProps) => {
    const { isGodMode, content, updateContent } = useMagic();

    // Resolve content from nested key
    const getValue = (obj: any, path: string) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    const storedValue = getValue(content, id);
    const finalValue = storedValue !== undefined ? storedValue : defaultText;

    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(finalValue);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setTempValue(finalValue);
    }, [finalValue]);

    // Adjust textarea height
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (tempValue !== finalValue) {
            updateContent(id, tempValue);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) { // Simple enter saves unless shift held
            e.preventDefault();
            handleSave();
        }
        if (e.key === 'Escape') {
            setTempValue(finalValue);
            setIsEditing(false);
        }
    };

    if (!isGodMode) {
        return <Component className={className} {...props}>{finalValue}</Component>;
    }

    // --- EDITOR MODE ---

    if (isEditing) {
        return (
            <div className="relative inline-block w-full min-w-[200px]">
                <textarea
                    ref={inputRef}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        "bg-zinc-900/90 text-white border border-indigo-500 rounded p-1 outline-none resize-none overflow-hidden w-full align-middle z-50 relative shadow-xl shadow-indigo-500/20",
                        // Inherit font styles from parent roughly, but normalize for input
                        "font-inherit text-inherit leading-inherit tracking-inherit"
                    )}
                    style={{
                        fontSize: 'inherit',
                        lineHeight: 'inherit',
                        fontWeight: 'inherit',
                        fontFamily: 'inherit',
                        letterSpacing: 'inherit',
                        textAlign: 'inherit'
                    }}
                />
                <div className="absolute -top-3 -right-3 z-50 flex gap-1">
                    <button onMouseDown={(e) => e.preventDefault()} className="bg-green-500 text-black p-1 rounded-full shadow hover:scale-110 transition">
                        <Save size={12} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Component
            onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent link clicks
                setIsEditing(true);
            }}
            className={cn(
                className,
                "cursor-pointer transition-all relative group",
                // Visual cues for Magic Mode
                "outline outline-1 outline-indigo-500/30 hover:outline-2 hover:outline-dashed hover:outline-indigo-500 hover:bg-indigo-500/10 rounded px-1 -mx-1"
            )}
            title={`Magic Edit: ${id}`}
            {...props}
        >
            {finalValue}
            <span className="absolute -top-3 -right-1 opacity-100 scale-75 lg:opacity-0 lg:group-hover:opacity-100 lg:scale-100 transition-all bg-indigo-600 text-white text-[8px] px-1 rounded font-mono pointer-events-none shadow-lg z-50">
                EDIT
            </span>
        </Component>
    );
};
