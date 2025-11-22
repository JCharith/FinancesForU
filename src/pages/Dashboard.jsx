import { useEffect, useState } from "react";
import { getMarketOverview, getLiveUsMarket } from "../lib/api";

export default function Dashboard() {
  const [market, setMarket] = useState(null);
  const [liveUs, setLiveUs] = useState(null);
  const [liveBtc, setLiveBtc] = useState(null);

  useEffect(() => {
    async function load() {
      const data = await getMarketOverview();
      setMarket(data);
    }
    load();
  }, []);

  useEffect(() => {
    let intervalId;

    async function fetchLive() {
      try {
        const data = await getLiveUsMarket("SPY");
        if (data.hasData) {
          setLiveUs(data.price);
        }

        const btcData = await getLiveUsMarket("BINANCE:BTCUSDT");
        if (btcData.hasData) {
          setLiveBtc(btcData.price);
        }
      } catch (err) {
        console.error("Error fetching live US market:", err);
      }
    }

    // initial call
    fetchLive();
    // poll every 3 seconds
    intervalId = setInterval(fetchLive, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Welcome back, <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">Trader</span>
        </h2>
        <p className="text-slate-500 mt-2">Here's what's happening in the markets today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* US Market Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm border border-blue-100 hover:shadow-md hover:scale-[1.02] transition-all duration-300">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
          <h3 className="font-semibold text-blue-900">US Market</h3>
          <p className="text-xs text-blue-600/80 mt-1">
            Live SPY price (S&P 500 Proxy)
          </p>
          <div className="mt-4 text-4xl font-bold text-blue-600 tracking-tight">
            {liveUs !== null ? `$${liveUs.toFixed(2)}` : "Waiting..."}
          </div>
          <p className="text-xs text-blue-400 mt-2 font-medium">
            Updating live from Finnhub
          </p>
        </div>

        {/* Bitcoin Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-sm border border-amber-100 hover:shadow-md hover:scale-[1.02] transition-all duration-300">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl"></div>
          <h3 className="font-semibold text-amber-900">Bitcoin (Live)</h3>
          <p className="text-xs text-amber-600/80 mt-1">
            BTC/USDT from Binance
          </p>
          <div className="mt-4 text-4xl font-bold text-amber-500 tracking-tight">
            {liveBtc !== null ? `$${liveBtc.toFixed(2)}` : "Waiting..."}
          </div>
          <p className="text-xs text-amber-400 mt-2 font-medium">
            24/7 Crypto Market
          </p>
        </div>

        {/* India Market Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-sm border border-emerald-100 hover:shadow-md hover:scale-[1.02] transition-all duration-300">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl"></div>
          <h3 className="font-semibold text-emerald-900">India Market</h3>
          <p className="text-xs text-emerald-600/80 mt-1">
            NIFTY 50 Sentiment
          </p>
          <div className="mt-4 text-4xl font-bold text-emerald-600 tracking-tight">
            {market ? market.indianMarket : "Loading..."}
          </div>
          <p className="text-xs text-emerald-400 mt-2 font-medium">
            Market Trend
          </p>
        </div>

        {/* Sentiment Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md hover:scale-[1.02] transition-all duration-300 md:col-span-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Global Sentiment</h3>
              <p className="text-sm text-slate-500 mt-1">
                Overall market mood based on news and technicals.
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">
                {market ? market.sentiment : "Loading..."}
              </div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">
                Current Mood
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
