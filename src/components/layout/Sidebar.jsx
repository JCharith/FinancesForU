import { NavLink } from "react-router-dom";

const linkBase =
  "block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out";
const active =
  "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 translate-x-1";
const inactive =
  "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100 hover:translate-x-1";

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-64 bg-slate-900/95 backdrop-blur-xl text-slate-100 h-[calc(100vh-64px)] p-6 border-r border-slate-800 sticky top-16">
      <div className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-wider px-4">
        Navigation
      </div>
      <nav className="space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/bull-vs-bear"
          className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
        >
          Bitcoin vs SPY
        </NavLink>
        <NavLink
          to="/stocks"
          className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
        >
          Stock Explorer
        </NavLink>
        <NavLink
          to="/news"
          className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
        >
          Market News
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => `${linkBase} ${isActive ? active : inactive}`}
        >
          About
        </NavLink>
      </nav>
    </aside>
  );
}
