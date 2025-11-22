import React from 'react';

export default function About() {
  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="relative inline-block group">
          <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full group-hover:bg-emerald-500/30 transition-all duration-500"></div>
          <img
            src="/FinancesForU.png"
            alt="FinancesForU Logo"
            className="relative w-32 h-32 mx-auto object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-500"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          About <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">FinancesForU</span>
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Empowering traders with real-time insights. Bridging the gap between Crypto and Traditional Markets.
        </p>
      </div>

      {/* Mission Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full -mr-16 -mt-16 z-0"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            FinancesForU is designed to provide a comprehensive, real-time view of the global financial landscape.
            We believe in the convergence of traditional finance and decentralized assets. Our platform tracks
            both <span className="font-semibold text-amber-600">Bitcoin (Crypto)</span> and the <span className="font-semibold text-blue-600">US Market (SPY)</span> side-by-side, giving you the
            complete picture of market sentiment.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-2xl border border-emerald-100 hover:scale-[1.02] transition-transform duration-300">
          <h3 className="text-xl font-semibold text-emerald-900 mb-2">Real-Time Data</h3>
          <p className="text-emerald-700/80 text-sm font-medium">
            Live ticks from Binance and Finnhub ensure you never miss a market move.
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 hover:scale-[1.02] transition-transform duration-300">
          <h3 className="text-xl font-semibold text-blue-900 mb-2">Market Comparison</h3>
          <p className="text-blue-700/80 text-sm font-medium">
            Compare Crypto vs Equities instantly with our specialized dual-charting tools.
          </p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100 hover:scale-[1.02] transition-transform duration-300">
          <h3 className="text-xl font-semibold text-amber-900 mb-2">Global Sentiment</h3>
          <p className="text-amber-700/80 text-sm font-medium">
            AI-driven sentiment analysis to gauge the overall market mood.
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100 hover:scale-[1.02] transition-transform duration-300">
          <h3 className="text-xl font-semibold text-purple-900 mb-2">Modern UI</h3>
          <p className="text-purple-700/80 text-sm font-medium">
            A premium, glassmorphic interface designed for clarity and aesthetics.
          </p>
        </div>
      </div>

      {/* Footer/Credits */}
      <div className="text-center border-t border-slate-200 pt-8">
        <p className="text-slate-500 text-sm">
          Built with ❤️ using the MERN Stack + Vite.
        </p>
      </div>
    </div>
  );
}
