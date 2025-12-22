import Image from 'next/image';
import Link from 'next/link';

export const PurrpurrInvestigator = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center z-10">
            <div className="relative w-64 h-64 mb-6 animate-float">
                <Image
                    src="/assets/purrpurr/investigator.png"
                    alt="Purrpurr Investigator 404"
                    fill
                    className="object-contain drop-shadow-[0_0_15px_rgba(167,139,250,0.5)]"
                />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                CASE #404: MISSING ROUTE
            </h2>
            <p className="text-zinc-400 max-w-md mb-8">
                Purrpurr has investigated this URL but found no evidence of its existence.
                It seems this page has vanished into the digital void.
            </p>

            <Link
                href="/"
                className="group px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-emerald-400 hover:bg-zinc-800 hover:border-emerald-500 transition-all duration-300 font-mono text-sm"
            >
                <span className="mr-2 inline-block transition-transform group-hover:-translate-x-1">{'<'}</span>
                RETURN_TO_BASE
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">{'/>'}</span>
            </Link>
        </div>
    );
};
