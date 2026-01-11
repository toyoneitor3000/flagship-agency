
import React from 'react';
import Link from 'next/link';
import { wikiDatabase } from '@/lib/wiki-terminology';

interface WikiLinkerProps {
    text: string;
    className?: string; // Standard text styling
}

export const WikiLinker: React.FC<WikiLinkerProps> = ({ text, className = '' }) => {
    // 1. Sort terms by length (descending) to match "Landing Page" before "Page"
    const sortedTerms = [...wikiDatabase].sort((a, b) => b.term.length - a.term.length);

    // 2. Escape regex special characters in terms
    const escapeRegExp = (string: string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };

    // 3. Create a single master regex
    // Matches any term as a whole word (using word boundaries \b)
    // We use capturing group () to include the matched separator in the split result
    const pattern = new RegExp(`\\b(${sortedTerms.map(t => escapeRegExp(t.term)).join('|')})\\b`, 'gi');

    // 4. Split the text
    const parts = text.split(pattern);

    return (
        <span className={className}>
            {parts.map((part, index) => {
                // Find if this part corresponds to a term
                const matchedTerm = sortedTerms.find(
                    t => t.term.toLowerCase() === part.toLowerCase()
                );

                if (matchedTerm) {
                    return (
                        <Link
                            key={index}
                            href={`/wiki#${matchedTerm.slug}`}
                            className="text-indigo-400 font-medium hover:text-indigo-300 hover:underline decoration-indigo-500/30 underline-offset-2 transition-colors cursor-help"
                        >
                            {part}
                        </Link>
                    );
                }

                return <span key={index}>{part}</span>;
            })}
        </span>
    );
};
