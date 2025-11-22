import { useState, useEffect } from "react";
import SingleLineChart from "../components/charts/SingleLineChart";
import DualLineChart from "../components/charts/DualLineChart";
import { getLiveUsMarket } from "../lib/api";

export default function BullVsBear() {
  const [bullData, setBullData] = useState([]);
  const [bearData, setBearData] = useState([]);
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      // Fetch Bitcoin (Bull)
      let btcPrice = null;
      try {
        const btcRes = await getLiveUsMarket("BINANCE:BTCUSDT");
        if (btcRes.hasData) {
          btcPrice = btcRes.price;
        }
      } catch (e) {
        console.error("Error fetching BTC", e);
      }

      // Fetch SPY (Bear)
      let spyPrice = null;
      try {
        const spyRes = await getLiveUsMarket("SPY");
        if (spyRes.hasData) {
          spyPrice = spyRes.price;
        }
      } catch (e) {
        console.error("Error fetching SPY", e);
      }

      // Update states if we have data
      if (btcPrice !== null) {
        setBullData((prev) => {
          const newData = [...prev, { time, value: btcPrice }];
          return newData.slice(-20); // Keep last 20 points
        });
      }

      if (spyPrice !== null) {
        setBearData((prev) => {
          const newData = [...prev, { time, value: spyPrice }];
          return newData.slice(-20); // Keep last 20 points
        });
      }

      if (btcPrice !== null && spyPrice !== null) {
        setCombinedData((prev) => {
          const newData = [
            ...prev,
            { time, bull: btcPrice, bear: spyPrice },
          ];
          return newData.slice(-20);
        });
      } else if (btcPrice !== null || spyPrice !== null) {
        setCombinedData((prev) => {
          const newData = [
            ...prev,
            {
              time,
              bull: btcPrice !== null ? btcPrice : (prev[prev.length - 1]?.bull || 0),
              bear: spyPrice !== null ? spyPrice : (prev[prev.length - 1]?.bear || 0)
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
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Bitcoin vs SPY
        </h2>
        <p className="text-slate-500 mt-2">
          Live data comparison. Left side tracks <span className="font-semibold text-amber-600">Bitcoin</span>, Right side tracks <span className="font-semibold text-blue-600">SPY</span>.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
          <div className="relative z-10">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Bitcoin (Live)
            </h3>
            <SingleLineChart data={bullData} dataKey="value" label="Bitcoin" />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
          <div className="relative z-10">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              US Market - SPY (Live)
            </h3>
            <SingleLineChart data={bearData} dataKey="value" label="SPY" />
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
