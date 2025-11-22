import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4 flex items-center justify-between shadow-sm">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Finances<span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">ForU</span>
      </h1>

      <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
        <Link to="/" className="hover:text-emerald-600 transition-colors">Dashboard</Link>
        <Link to="/bull-vs-bear" className="hover:text-emerald-600 transition-colors">Bitcoin vs SPY</Link>
        <Link to="/stocks" className="hover:text-emerald-600 transition-colors">Stocks</Link>
        <Link to="/news" className="hover:text-emerald-600 transition-colors">News</Link>
        <Link to="/about" className="hover:text-emerald-600 transition-colors">About</Link>
      </nav>
    </header>
  );
}
