"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const { publicKey } = useWallet();

  // Memotong alamat wallet agar rapi (contoh: 7xKb...3pQa)
  const truncatedAddress = publicKey
    ? `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`
    : null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-50">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Gondrong Exchange
      </h1>
      <p className="text-zinc-400 text-center max-w-md mb-8">
        A modern Solana DEX landing page built with Next.js and AI-assisted workflow.
      </p>
      
      <div className="flex flex-col items-center gap-4">
        <WalletMultiButton />
        {truncatedAddress && (
          <p className="text-zinc-400 text-sm">
            Connected: {truncatedAddress}
          </p>
        )}
      </div>
    </main>
  );
}