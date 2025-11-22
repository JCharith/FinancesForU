import { useState, useEffect } from "react";
import SingleLineChart from "../components/charts/SingleLineChart";
import DualLineChart from "../components/charts/DualLineChart";
import { getLiveUsMarket } from "../lib/api";

const CRYPTO_OPTIONS = [
  { label: "Bitcoin (BTC)", value: "BINANCE:BTCUSDT", color: "amber" },
  { label: "Ethereum (ETH)", value: "BINANCE:ETHUSDT", color: "indigo" },
  { label: "Solana (SOL)", value: "BINANCE:SOLUSDT", color: "purple" },
];

const STOCK_OPTIONS = [
  { label: "S&P 500 (SPY)", value: "SPY", color: "blue" },
  { label: "Apple (AAPL)", value: "AAPL", color: "slate" },
  { label: "Tesla (TSLA)", value: "TSLA", color: "red" },
  { label: "NVIDIA (NVDA)", value: "NVDA", color: "green" },
  { label: "Microsoft (MSFT)", value: "MSFT", color: "cyan" },
  { label: "Amazon (AMZN)", value: "AMZN", color: "orange" },
  { label: "Google (GOOGL)", value: "GOOGL", color: "yellow" },
];

export default function BullVsBear() {
  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTO_OPTIONS[0]);
  const [selectedStock, setSelectedStock] = useState(STOCK_OPTIONS[0]);

  const [bullData, setBullData] = useState([]);
  const [bearData, setBearData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  // Clear data when selection changes
  useEffect(() => {
    setBullData([]);
    setBearData([]);
    setCombinedData([]);
  }, [selectedCrypto, selectedStock]);

  useEffect(() => {
    const fetchData = async () => {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      // Fetch Crypto (Bull)
      let cryptoPrice = null;
      try {
        const res = await getLiveUsMarket(selectedCrypto.value);
        if (res.hasData) {
          cryptoPrice = res.price;
        }
      } catch (e) {
        console.error("Error fetching Crypto", e);
      }

      // Fetch Stock (Bear)
      let stockPrice = null;
      try {
        const res = await getLiveUsMarket(selectedStock.value);
        if (res.hasData) {
          stockPrice = res.price;
        }
      } catch (e) {
        console.error("Error fetching Stock", e);
      }

      // Update states if we have data
      if (cryptoPrice !== null) {
        setBullData((prev) => {
          const newData = [...prev, { time, value: cryptoPrice }];
          return newData.slice(-20);
        });
      }

      if (stockPrice !== null) {
        setBearData((prev) => {
          const newData = [...prev, { time, value: stockPrice }];
          return newData.slice(-20);
        });
      }

      if (cryptoPrice !== null || stockPrice !== null) {
        setCombinedData((prev) => {
          const newData = [
            ...prev,
            {
              time,
              bull: cryptoPrice !== null ? cryptoPrice : (prev[prev.length - 1]?.bull || 0),
              bear: stockPrice !== null ? stockPrice : (prev[prev.length - 1]?.bear || 0)
            },
          ];
          return newData.slice(-20);
        });
      }
    };

    // Initial fetch
    fetchData();

    // Poll every 3 seconds
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [selectedCrypto, selectedStock]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Market Comparison
          </h2>
          <p className="text-slate-500 mt-2">
            Compare live performance of <span className={`font-semibold text-${selectedCrypto.color}-600`}>{selectedCrypto.label}</span> vs <span className={`font-semibold text-${selectedStock.color}-600`}>{selectedStock.label}</span>.
          </p>
        </div>

        <div className="flex gap-4">
          <select
            className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full p-2.5 shadow-sm"
            value={selectedCrypto.value}
            onChange={(e) => setSelectedCrypto(CRYPTO_OPTIONS.find(o => o.value === e.target.value))}
          >
            {CRYPTO_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <select
            className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm"
            value={selectedStock.value}
            onChange={(e) => setSelectedStock(STOCK_OPTIONS.find(o => o.value === e.target.value))}
          >
            {STOCK_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className={`relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300`}>
          <div className={`absolute top-0 right-0 w-32 h-32 bg-${selectedCrypto.color}-50 rounded-bl-full -mr-8 -mt-8 z-0`}></div>
          <div className="relative z-10">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full bg-${selectedCrypto.color}-500`}></span>
              {selectedCrypto.label} (Live)
            </h3>
            <SingleLineChart data={bullData} dataKey="value" label={selectedCrypto.label} />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
          <div className={`absolute top-0 right-0 w-32 h-32 bg-${selectedStock.color}-50 rounded-bl-full -mr-8 -mt-8 z-0`}></div>
          <div className="relative z-10">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full bg-${selectedStock.color}-500`}></span>
              {selectedStock.label} (Live)
            </h3>
            <SingleLineChart data={bearData} dataKey="value" label={selectedStock.label} />
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full -mr-16 -mt-16 z-0"></div>
        <div className="relative z-10">
          <h3 className="font-semibold text-slate-800 mb-4">
            Combined View
          </h3>
          <DualLineChart
            data={combinedData}
            bullKey="bull"
            bearKey="bear"
          />
        </div>
      </div>
    </div>
  );
}
