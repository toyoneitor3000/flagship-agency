import Image from 'next/image';

export const PurrpurrLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center p-2">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 animate-pulse">
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
