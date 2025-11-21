import SingleLineChart from "../components/charts/SingleLineChart";
import DualLineChart from "../components/charts/DualLineChart";

const bullData = [
  { time: "09:30", value: 100 },
  { time: "10:00", value: 102 },
  { time: "10:30", value: 105 },
  { time: "11:00", value: 109 },
  { time: "11:30", value: 112 },
  { time: "12:00", value: 115 },
];

const bearData = [
  { time: "09:30", value: 100 },
  { time: "10:00", value: 99 },
  { time: "10:30", value: 97 },
  { time: "11:00", value: 95 },
  { time: "11:30", value: 94 },
  { time: "12:00", value: 92 },
];

const combinedData = [
  { time: "09:30", bull: 100, bear: 100 },
  { time: "10:00", bull: 102, bear: 99 },
  { time: "10:30", bull: 105, bear: 97 },
  { time: "11:00", bull: 109, bear: 95 },
  { time: "11:30", bull: 112, bear: 94 },
  { time: "12:00", bull: 115, bear: 92 },
];

export default function BullVsBear() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900">
        Bull vs Bear Markets
      </h2>

      <p className="text-sm text-slate-600">
        These charts currently use static dummy data. In later stages, the bull
        side will read live data from NSE (SmartAPI) and the bear side from US
        indices (Finnhub).
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-medium text-slate-700 mb-2">
            Bull Market – NSE (Dummy)
          </h3>
          <SingleLineChart data={bullData} dataKey="value" label="NSE Bull" />
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-medium text-slate-700 mb-2">
            Bear Market – US (Dummy)
          </h3>
          <SingleLineChart data={bearData} dataKey="value" label="US Bear" />
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
