export default function About() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">
        About FinancesForU
      </h2>
      <p className="text-sm text-slate-600 leading-relaxed">
        FinancesForU is a MERN-stack financial dashboard designed to track both
        bull and bear markets in real time. It will combine:
      </p>
      <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
        <li>US market data (bear side) via live feeds</li>
        <li>Indian NSE market data (bull side) via SmartAPI / NSE</li>
        <li>Historical charts and comparisons</li>
        <li>Latest financial news and sentiment signals</li>
      </ul>
      <p className="text-sm text-slate-600">
        Stage 1 focuses only on layout and UX with dummy data. Later stages will
        plug in real APIs and WebSockets.
      </p>
    </div>
  );
}
