import { PurrpurrLoader } from "@/components/purrpurr/PurrpurrLoader";

export default function Loading() {
    return (
        <div className="fixed inset-0 min-h-screen w-full flex items-center justify-center bg-zinc-950/90 backdrop-blur-md z-[9999]">
            <PurrpurrLoader />
        </div>
    );
}
