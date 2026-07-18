export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-50">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Gondrong Exchange
      </h1>
      <p className="text-zinc-400 text-center max-w-md mb-8">
        A modern Solana DEX landing page built with Next.js and AI-assisted workflow.
      </p>
      
      {/* Placeholder untuk tombol Connect Wallet di Block 2 */}
      <div className="mt-4 p-6 border border-zinc-800 rounded-xl bg-zinc-900/50 text-zinc-500 text-sm">
        [Connect Wallet Button will be placed here in Block 2]
      </div>
    </main>
  );
}