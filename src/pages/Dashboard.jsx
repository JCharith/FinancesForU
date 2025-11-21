import { useEffect, useState } from "react";
import { getMarketOverview, getLiveUsMarket } from "../lib/api";

export default function Dashboard() {
  const [market, setMarket] = useState(null);
  const [liveUs, setLiveUs] = useState(null);

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
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900">
        Global Market Overview
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-medium text-slate-700">US Market (Bear)</h3>
          <p className="text-xs text-slate-500 mt-1">
            Live SPY price (proxy for S&P 500).
          </p>
          <div className="mt-4 text-3xl font-semibold text-orange-500">
            {liveUs !== null ? `$${liveUs.toFixed(2)}` : "Waiting for ticks..."}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Updating every few seconds from Finnhub.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-medium text-slate-700">India Market (Bull)</h3>
          <p className="text-3xl font-semibold text-emerald-500 mt-4">
            {market ? market.indianMarket : "Loading..."}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-medium text-slate-700">Sentiment</h3>
          <p className="text-lg text-slate-600 mt-4">
            {market ? market.sentiment : "Loading..."}
          </p>
        </div>
      </div>
    </div>
  );
}
