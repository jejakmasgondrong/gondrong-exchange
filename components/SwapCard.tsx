"use client";

import { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import TokenSelectorModal, { TOKENS } from "./TokenSelectorModal";

export default function SwapCard() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  
  // State Token
  const [fromToken, setFromToken] = useState(TOKENS[0]); // SOL
  const [toToken, setToToken] = useState(TOKENS[1]);     // USDC

  // State Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModalSide, setActiveModalSide] = useState<"from" | "to">("from");

  // State Input & Price
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);
  const [solBalance, setSolBalance] = useState<number>(0);
  
  // State untuk harga real-time (Default fallback: 145.50)
  const [exchangeRate, setExchangeRate] = useState<number>(145.50);
  const [isPriceLoading, setIsPriceLoading] = useState<boolean>(true);

  // 1. FETCH HARGA REAL-TIME DARI JUPITER API
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        setIsPriceLoading(true);
        // Jupiter Price API (Gratis, no auth required untuk basic usage)
        // ID SOL: So11111111111111111111111111111111111111112
        // ID USDC: EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v
        const response = await fetch(
          "https://price.jup.ag/v4/price?ids=So11111111111111111111111111111111111111112&vsToken=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        );
        const data = await response.json();
        
        if (data.data && data.data["So11111111111111111111111111111111111111112"]) {
          const price = data.data["So11111111111111111111111111111111111111112"].price;
          setExchangeRate(price);
          console.log("✅ Real-time SOL Price fetched:", price);
        }
      } catch (error) {
        console.error("Failed to fetch price, using fallback:", error);
        // Fallback tetap aman di 145.50 jika API down
      } finally {
        setIsPriceLoading(false);
      }
    };

    fetchPrice();
    // Refresh harga setiap 30 detik
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  // 2. Ambil Saldo SOL
  useEffect(() => {
    if (publicKey) {
      connection.getBalance(publicKey).then((bal) => {
        setSolBalance(bal / LAMPORTS_PER_SOL);
      });
    } else {
      setSolBalance(0);
    }
  }, [publicKey, connection]);

  // 3. Kalkulasi Otomatis berdasarkan Exchange Rate Real-time
  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      const calculated = parseFloat(value) * exchangeRate;
      setToAmount(calculated.toFixed(4));
    } else {
      setToAmount("");
    }
  };

  const openModal = (side: "from" | "to") => {
    setActiveModalSide(side);
    setIsModalOpen(true);
  };

  const handleTokenSelect = (token: typeof TOKENS[0]) => {
    if (activeModalSide === "from") {
      setFromToken(token);
    } else {
      setToToken(token);
    }
    setFromAmount("");
    setToAmount("");
  };

  const handleFlip = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = () => {
    if (!connected || !fromAmount) return;
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      alert(`[Simulasi] Swap ${fromAmount} ${fromToken.symbol} to ${toAmount} ${toToken.symbol} @ rate ${exchangeRate}`);
      setFromAmount("");
      setToAmount("");
    }, 2000);
  };

  const setMaxAmount = () => {
    if (solBalance > 0 && fromToken.symbol === "SOL") {
      const maxSwap = Math.max(0, solBalance - 0.005);
      handleFromAmountChange(maxSwap.toFixed(4));
    }
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-4 shadow-2xl shadow-purple-900/10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-lg font-semibold text-zinc-100">Swap</h2>
          <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </button>
        </div>

        {/* FROM Section */}
        <div className="bg-zinc-950/50 rounded-2xl p-4 border border-zinc-800/50 hover:border-zinc-700 transition-colors">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-zinc-400">You pay</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-400">
                Balance: {fromToken.symbol === "SOL" ? solBalance.toFixed(4) : fromToken.balance}
              </span>
              {fromToken.symbol === "SOL" && (
                <button onClick={setMaxAmount} className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors">MAX</button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              className="w-full bg-transparent text-3xl font-semibold text-zinc-100 placeholder-zinc-600 focus:outline-none"
            />
            <button 
              onClick={() => openModal("from")}
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-2 rounded-xl font-medium transition-colors shrink-0"
            >
              <img src={fromToken.logo} alt={fromToken.symbol} className="w-5 h-5 rounded-full" />
              {fromToken.symbol}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          </div>
        </div>

        {/* Flip Button */}
        <div className="relative h-4 flex items-center justify-center my-2">
          <button 
            onClick={handleFlip}
            className="absolute z-10 bg-zinc-800 hover:bg-zinc-700 border-4 border-zinc-900 p-2 rounded-xl text-zinc-300 hover:text-white transition-all hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
          </button>
          <div className="w-full border-t border-zinc-800"></div>
        </div>

        {/* TO Section */}
        <div className="bg-zinc-950/50 rounded-2xl p-4 border border-zinc-800/50 hover:border-zinc-700 transition-colors">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-zinc-400">You receive</span>
            <span className="text-sm text-zinc-400">Balance: {toToken.balance}</span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="0.0"
              value={toAmount}
              readOnly
              className="w-full bg-transparent text-3xl font-semibold text-zinc-100 placeholder-zinc-600 focus:outline-none cursor-default"
            />
            <button 
              onClick={() => openModal("to")}
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-2 rounded-xl font-medium transition-colors shrink-0"
            >
              <img src={toToken.logo} alt={toToken.symbol} className="w-5 h-5 rounded-full" />
              {toToken.symbol}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSwap}
          disabled={!connected || isSwapping || !fromAmount}
          className={`w-full mt-4 py-4 rounded-2xl font-bold text-lg transition-all transform active:scale-95 ${
            !connected
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              : isSwapping
              ? "bg-purple-600/50 text-zinc-300 cursor-wait"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-600/25"
          }`}
        >
          {!connected ? "Connect Wallet to Swap" : isSwapping ? "Confirming in Wallet..." : "Swap"}
        </button>

        {/* Footer Info (Dinamis berdasarkan API) */}
        <div className="mt-4 px-2 flex justify-between text-xs text-zinc-500">
          <span>
            {isPriceLoading ? "Fetching price..." : `Price: 1 ${fromToken.symbol} ≈ $${exchangeRate.toFixed(2)} ${toToken.symbol}`}
          </span>
          <span>Network Fee: ~0.000005 SOL</span>
        </div>
      </div>

      {/* Render Modal */}
      <TokenSelectorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleTokenSelect}
        excludeSymbol={activeModalSide === "from" ? toToken.symbol : fromToken.symbol}
      />
    </>
  );
}