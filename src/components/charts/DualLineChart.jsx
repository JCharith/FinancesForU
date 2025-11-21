import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function DualLineChart({ data, bullKey, bearKey }) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={bullKey}
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
            name="Bull (NSE)"
          />
          <Line
            type="monotone"
            dataKey={bearKey}
            stroke="#f97316"
            strokeWidth={2}
            dot={false}
            name="Bear (US)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
