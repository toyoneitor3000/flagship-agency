import Image from 'next/image';

export const PurrpurrLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="relative w-64 h-64 animate-pulse">
                <Image
                    src="/assets/purrpurr/purrpurr_loader_v2.png"
                    alt="Purrpurr Loading..."
                    fill
                    className="object-contain"
                />
            </div>

        </div>
    );
};
