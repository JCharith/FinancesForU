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
        // If one is missing, still update combined but with null for missing? 
        // Or just repeat last known? For simplicity, let's just push what we have.
        // Actually, charts handle nulls gracefully usually, or we can just skip combined update if one is missing.
        // Let's try to update with what we have.
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
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900">
        Bull vs Bear Markets
      </h2>

      <p className="text-sm text-slate-600">
        Live data comparison. Bull side tracks Bitcoin (Crypto), Bear side tracks SPY (US Market).
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-medium text-slate-700 mb-2">
            Bitcoin (Live)
          </h3>
          <SingleLineChart data={bullData} dataKey="value" label="Bitcoin" />
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-medium text-slate-700 mb-2">
            US Market - SPY (Live)
          </h3>
          <SingleLineChart data={bearData} dataKey="value" label="SPY" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="font-medium text-slate-700 mb-2">
          Combined Bull vs Bear View
        </h3>
        <DualLineChart
          data={combinedData}
          bullKey="bull"
          bearKey="bear"
        />
      </div>
    </div>
  );
}
