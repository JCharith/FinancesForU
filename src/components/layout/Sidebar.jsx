import { NavLink } from "react-router-dom";

const linkBase =
  "block px-4 py-2 rounded-md text-sm transition-colors";
const active =
  "bg-emerald-500 text-slate-900 font-semibold";
const inactive =
  "text-slate-200 hover:bg-slate-700 hover:text-white";

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-60 bg-slate-900 text-slate-100 h-[calc(100vh-56px)] p-4">
      <div className="text-xs text-slate-400 mb-3 uppercase tracking-wide">
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
          Bull vs Bear
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
