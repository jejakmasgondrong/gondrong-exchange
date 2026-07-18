"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function Home() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (publicKey) {
      connection.getBalance(publicKey).then((bal) => {
        setBalance(bal / LAMPORTS_PER_SOL);
      });
    } else {
      setBalance(null);
    }
  }, [publicKey, connection]);

  const truncatedAddress = publicKey
    ? `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}`
    : null;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Header/Navigation */}
      <header className="border-b border-zinc-800/50 backdrop-blur-sm bg-zinc-950/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Gondrong Exchange
              </h1>
            </div>

            {/* Network Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="text-sm text-zinc-400">devnet</span>
            </div>

            {/* Connect Wallet Button */}
            <div className="flex items-center gap-4">
              <WalletMultiButton />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-zinc-950 to-pink-900/20 pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-32">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 mb-8">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-sm text-zinc-300">Live on Solana Devnet</span>
            </div>

            {/* Main Title with Gradient */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Gondrong Exchange
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
              The fastest way to swap tokens on Solana. Zero friction, maximum gondrong power.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25">
                Start Trading
              </button>
              <button className="px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-semibold hover:bg-zinc-800 hover:border-zinc-700 transition-all">
                View Markets
              </button>
            </div>

            {/* Wallet Connection Info */}
            {truncatedAddress && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800">
                <span className="text-zinc-400">Connected:</span>
                <span className="text-zinc-200 font-mono text-sm">{truncatedAddress}</span>
                {balance !== null && (
                  <span className="text-emerald-400 text-sm ml-2">
                    ({balance.toFixed(4)} SOL)
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-zinc-800/50 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Stat Card 1 */}
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                $2.4B+
              </div>
              <div className="text-sm text-zinc-400">Total Volume</div>
            </div>

            {/* Stat Card 2 */}
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all">
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
                1.2M
              </div>
              <div className="text-sm text-zinc-400">24h Trades</div>
            </div>

            {/* Stat Card 3 */}
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent mb-2">
                500+
              </div>
              <div className="text-sm text-zinc-400">Tokens</div>
            </div>

            {/* Stat Card 4 */}
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                $0.001
              </div>
              <div className="text-sm text-zinc-400">Avg Fee</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}