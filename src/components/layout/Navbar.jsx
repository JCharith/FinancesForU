import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="w-full bg-slate-900 text-slate-50 px-6 py-3 flex items-center justify-between">
      <h1 className="text-xl font-bold tracking-tight">
        Finances<span className="text-emerald-400">ForU</span>
      </h1>

      <nav className="hidden md:flex gap-4 text-sm">
        <Link to="/" className="hover:text-emerald-300">Dashboard</Link>
        <Link to="/bull-vs-bear" className="hover:text-emerald-300">Bitcoin vs SPY</Link>
        <Link to="/stocks" className="hover:text-emerald-300">Stocks</Link>
        <Link to="/news" className="hover:text-emerald-300">News</Link>
        <Link to="/about" className="hover:text-emerald-300">About</Link>
      </nav>
    </header>
  );
}
