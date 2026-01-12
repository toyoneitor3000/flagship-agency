export default async function SlowPage() {
    // Artificial delay of 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-8">
            <h1 className="text-3xl font-bold text-emerald-400 mb-4">
                Loading Complete!
            </h1>
            <p className="text-zinc-400 max-w-md text-center">
                This page took 3 seconds to load, giving you enough time to admire the Purrpurr Loader in action.
            </p>
            <a
                href="/purrpurr-test"
                className="mt-8 px-6 py-2 bg-zinc-900 border border-zinc-700 rounded hover:bg-zinc-800 transition-colors"
            >
                &larr; Go Back
            </a>
        </div>
    );
}
