"use client";

import { useState } from "react";
import WertWidget from "@wert-io/widget-initializer";
import type { WertOptions } from "@wert-io/widget-initializer";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export default function NFT() {
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

      const options: WertOptions = {
        partner_id: "01JWWXA9V3M485Y5G43ERS0VYM",
        click_id: uuidv4(),
        origin: "https://sandbox.wert.io",
        theme: "dark",
        address: "0x2963F85d81C116DDbB853fA7032D4bdD429ea078",
        sc_address: "0xAAC496808A678B834073FB3435857FdcF0dc186F", // NFT kontrat adresi
        sc_input_data: "0x3c168eab0000000000000000000000000e976df9bb3ac63f7802ca843c9d121ae2ef22ee0000000000000000000000000000000000000000000000000000000000000001", // NFT satın alma fonksiyonu için input data
        commodity: "TT",
        commodity_amount: parseFloat(formData.amount),
        is_crypto_hidden: true,
        network: "amoy",
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
            NFT Checkout
          </h1>
          <p className="text-gray-600">Güvenli ve hızlı NFT satın alma işlemleri için</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="transform transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount (TT)
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
                <span className="text-gray-500">TT</span>
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
            href="/" 
            className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
          >
            Fiat OnRamp →
          </Link>
        </div>
      </div>
    </main>
  );
} 