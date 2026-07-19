"use client";

import { useState } from "react";

export const TOKENS = [
  {
    symbol: "SOL",
    name: "Solana",
    logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
    balance: "2.4500",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
    balance: "145.2000",
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    logo: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB/logo.png",
    balance: "0.0000",
  },
  {
    symbol: "BONK",
    name: "Bonk",
    logo: "https://arweave.net/hQiPZOsRZXGXBJd_82PhVdlM_hACsT_q6wqwf5cSY7I",
    balance: "1500000.00",
  },
  {
    symbol: "JUP",
    name: "Jupiter",
    logo: "https://static.jup.ag/jup/icon.png",
    balance: "12.5000",
  },
];

interface TokenSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: typeof TOKENS[0]) => void;
  excludeSymbol?: string;
}

export default function TokenSelectorModal({
  isOpen,
  onClose,
  onSelect,
  excludeSymbol,
}: TokenSelectorModalProps) {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filteredTokens = TOKENS.filter(
    (token) =>
      token.symbol.toLowerCase().includes(search.toLowerCase()) &&
      token.symbol !== excludeSymbol
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-5 shadow-2xl shadow-purple-900/20">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-zinc-100">Select a token</h3>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-4">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            type="text"
            placeholder="Search by name or symbol"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors"
            autoFocus
          />
        </div>

        {/* Token List */}
        <div className="space-y-1 max-h-[300px] overflow-y-auto pr-2">
          {filteredTokens.length === 0 ? (
            <div className="text-center py-8 text-zinc-500">No tokens found</div>
          ) : (
            filteredTokens.map((token) => (
              <button
                key={token.symbol}
                onClick={() => {
                  onSelect(token);
                  onClose();
                  setSearch("");
                }}
                className="w-full flex items-center justify-between p-3 hover:bg-zinc-800/50 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={token.logo} 
                    alt={token.symbol} 
                    className="w-9 h-9 rounded-full bg-zinc-800"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/36?text=' + token.symbol[0]; }} 
                  />
                  <div className="text-left">
                    <div className="font-semibold text-zinc-100 group-hover:text-white">{token.symbol}</div>
                    <div className="text-xs text-zinc-500">{token.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-zinc-300">{token.balance}</div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}