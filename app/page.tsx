"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [prices, setPrices] = useState({
    btc: null as number | null,
    eth: null as number | null,
    sol: null as number | null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd'
        );
        if (!response.ok) throw new Error('Failed to fetch prices');
        const data = await response.json();
        setPrices({
          btc: data.bitcoin.usd,
          eth: data.ethereum.usd,
          sol: data.solana.usd,
        });
        setLoading(false);
        setError(null);
      } catch {
        setError('Failed to load prices');
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-blue-950 via-black to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="text-center pt-16 pb-12 px-6">
          <h1 className="text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600">
            CRYPTO PRICES
          </h1>
          <p className="text-2xl mt-4 font-light text-purple-300">Live • On Base</p>
        </header>

        <main className="flex-1 px-6 pb-12 max-w-2xl mx-auto w-full">
          {loading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 animate-pulse">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-white/10 rounded-full" />
                    <div className="flex-1">
                      <div className="h-8 bg-white/20 rounded w-40 mb-3" />
                      <div className="h-12 bg-white/30 rounded w-56" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-red-400 text-xl mt-20">{error}</p>
          ) : (
            <div className="space-y-8">
              {/* Bitcoin */}
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-10 border border-white/20 shadow-2xl hover:shadow-purple-500/30 transition-all duration-400 hover:-translate-y-2">
                <div className="flex items-center gap-6">
                  <Image
                    src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
                    alt="Bitcoin Logo"
                    width={80}
                    height={80}
                    className="drop-shadow-2xl"
                  />
                  <div className="flex-1">
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                      Bitcoin
                    </h2>
                    <p className="text-2xl text-purple-300 mt-1">BTC</p>
                  </div>
                  <p className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    {prices.btc ? formatPrice(prices.btc) : '—'}
                  </p>
                </div>
              </div>

              {/* Ethereum */}
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-10 border border-white/20 shadow-2xl hover:shadow-purple-500/30 transition-all duration-400 hover:-translate-y-2">
                <div className="flex items-center gap-6">
                  <Image
                    src="https://cryptologos.cc/logos/ethereum-eth-logo.png"
                    alt="Ethereum Logo"
                    width={80}
                    height={80}
                    className="drop-shadow-2xl"
                  />
                  <div className="flex-1">
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                      Ethereum
                    </h2>
                    <p className="text-2xl text-purple-300 mt-1">ETH</p>
                  </div>
                  <p className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    {prices.eth ? formatPrice(prices.eth) : '—'}
                  </p>
                </div>
              </div>

              {/* Solana */}
              <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-10 border border-white/20 shadow-2xl hover:shadow-purple-500/30 transition-all duration-400 hover:-translate-y-2">
                <div className="flex items-center gap-6">
                  <Image
                    src="https://cryptologos.cc/logos/solana-sol-logo.png"
                    alt="Solana Logo"
                    width={80}
                    height={80}
                    className="drop-shadow-2xl"
                  />
                  <div className="flex-1">
                    <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                      Solana
                    </h2>
                    <p className="text-2xl text-purple-300 mt-1">SOL</p>
                  </div>
                  <p className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    {prices.sol ? formatPrice(prices.sol) : '—'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>

        <footer className="text-center pb-10 px-6">
          <p className="text-gray-400 text-sm">Data from CoinGecko • Updates every 10 seconds</p>
          <p className="text-gray-500 text-xs mt-2">Powered by Base Mini Apps</p>
        </footer>
      </div>
    </div>
  );
}