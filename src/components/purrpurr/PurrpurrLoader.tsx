import Image from 'next/image';

export const PurrpurrLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="relative w-32 h-32 animate-pulse">
                <Image
                    src="/assets/purrpurr/brand_loader.png"
                    alt="Purrpurr Loading..."
                    fill
                    className="object-contain"
                />
            </div>
            <p className="mt-4 text-emerald-400 font-mono text-sm tracking-widest animate-bounce">
                INITIALIZING...
            </p>
        </div>
    );
};
