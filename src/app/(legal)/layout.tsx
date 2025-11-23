export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 pt-24 pb-12 px-6">
      <div className="max-w-3xl mx-auto prose prose-invert prose-zinc">
        {children}
      </div>
    </div>
  );
}