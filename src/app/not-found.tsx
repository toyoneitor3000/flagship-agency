import { PurrpurrInvestigator } from "@/components/purrpurr/PurrpurrInvestigator";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 relative overflow-hidden">
            {/* Background Gradients for depth */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/40 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-900/20 rounded-full blur-3xl"></div>
            </div>
            <PurrpurrInvestigator />
        </div>
    );
}
