"use client";

import { useState } from "react";
import WertWidget from "@wert-io/widget-initializer";
import type { WertOptions } from "@wert-io/widget-initializer";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export default function Home() {
  const [formData, setFormData] = useState({
    amount: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Session oluştur
      const sessionResponse = await fetch('/api/create-session', {
        method: 'POST',
        body: JSON.stringify({
          currency_amount: parseFloat(formData.amount)
        })
      });

      console.log("sessionResponse: ", sessionResponse);
      
      const sessionData = await sessionResponse.json();
      console.log("sessionId: ", sessionData);
      if (!sessionResponse.ok) {
        throw new Error(sessionData.error || 'Session oluşturulamadı');
      }

      if (!sessionData.sessionId) {
        throw new Error('Session ID alınamadı');
      }

      const options: WertOptions = {
        partner_id: "01JWWXA9V3M485Y5G43ERS0VYM",
        session_id: sessionData.sessionId,
        click_id: uuidv4(),
        origin: "https://sandbox.wert.io", // this option needed only in sandbox
        theme: "dark",
        commodities: JSON.stringify([
          {
            commodity: 'TT',
            network: 'amoy'
          }
        ]),
        listeners: {
          loaded: () => {
            console.log("loaded");
            setIsLoading(false);
          },
          error: (error) => {
            console.error('Widget hatası:', error);
            setError('Widget yüklenirken bir hata oluştu');
            setIsLoading(false);
          }
        },
      };

      const wertWidget = new WertWidget(options);
      wertWidget.open();
    } catch (error) {
      console.error('Widget açma hatası:', error);
      setError(error instanceof Error ? error.message : 'Ödeme widget\'ı açılırken bir hata oluştu');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-8">
      <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden md:max-w-2xl p-8 transform transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Fiat OnRamp
          </h1>
          <p className="text-gray-600">Güvenli ve hızlı Crypto ödemeleri için</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="transform transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount (USD)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                min="1"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
                placeholder="0.00"
                required
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500">USD</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Loading...' : 'Pay Now'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link 
            href="/nft" 
            className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
          >
            NFT Checkout →
          </Link>
        </div>
      </div>
    </main>
  );
}
