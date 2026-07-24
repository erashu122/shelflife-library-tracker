import { BookMarked, ChartNoAxesCombined, Library, LogOut, Search, Sparkles, UserRound } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: ChartNoAxesCombined },
  { to: '/search', label: 'Search', icon: Search },
  { to: '/library', label: 'Library', icon: Library },
  { to: '/profile', label: 'Profile', icon: UserRound },
];

export default function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen px-4 py-4 text-gray-900 dark:text-gray-100 lg:px-6">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[250px_1fr]">
        <aside className="premium-card animate-riseIn rounded-lg p-4 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
          <div className="flex items-center justify-between gap-3 lg:block">
            <div className="relative z-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-glow">
                <BookMarked size={23} />
              </div>
              <div>
                <p className="text-lg font-bold">ShelfLife</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.name}</p>
              </div>
            </div>
            <div className="lg:hidden">
              <ThemeToggle />
            </div>
          </div>

          <div className="relative z-10 mt-6 rounded-lg border border-white/40 bg-white/40 p-3 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-teal-700 dark:text-teal-300">
              <Sparkles size={14} /> Portfolio Ready
            </div>
            <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
              JWT, MongoDB, Google Books and Google Auth wired into one polished stack.
            </p>
          </div>

          <nav className="relative z-10 mt-6 grid grid-cols-2 gap-2 lg:grid-cols-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                <item.icon size={18} /> {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="relative z-10 mt-6 hidden lg:block">
            <ThemeToggle />
          </div>

          <button type="button" onClick={logout} className="nav-link relative z-10 mt-4 w-full text-rose-600 dark:text-rose-300">
            <LogOut size={18} /> Logout
          </button>
        </aside>

        <main className="min-w-0 pb-10">
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
}
