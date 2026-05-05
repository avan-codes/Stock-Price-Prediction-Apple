import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors duration-200 ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em] text-black uppercase">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black text-xs">SL</span>
          StockSight
        </NavLink>
        <nav className="flex items-center gap-6">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/predict" className={linkClass}>Predict</NavLink>
          <NavLink to="/history" className={linkClass}>History</NavLink>
        </nav>
      </div>
    </header>
  );
}
