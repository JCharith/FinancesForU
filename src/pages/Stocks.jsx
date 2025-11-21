import { useState } from "react";
import { getStock } from "../lib/api";

export default function Stocks() {
  const [symbol, setSymbol] = useState("");
  const [result, setResult] = useState(null);

  async function handleSearch() {
    if (!symbol.trim()) return;
    const data = await getStock(symbol);
    setResult(data);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">
        Stock Explorer
      </h2>

      <div className="flex gap-3 bg-white p-4 shadow rounded-xl">
        <input
          className="border px-3 py-2 rounded-md"
          placeholder="Enter stock symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button
          className="bg-emerald-500 text-white px-4 py-2 rounded-md"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold text-slate-800">
            {result.symbol} — {result.trend}
          </h3>
          <p className="text-xl mt-2 font-bold text-slate-900">
            ${result.price}
          </p>
          <p className="text-xs text-slate-500">
            Volume: {result.volume.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
