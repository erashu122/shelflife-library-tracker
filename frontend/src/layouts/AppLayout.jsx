import { BookMarked, ChartNoAxesCombined, Library, LogOut, Search, UserRound } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
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
        <aside className="glass-panel rounded-lg p-4 lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
          <div className="flex items-center justify-between gap-3 lg:block">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal-600 text-white">
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

          <nav className="mt-6 grid grid-cols-2 gap-2 lg:grid-cols-1">
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

          <div className="mt-6 hidden lg:block">
            <ThemeToggle />
          </div>

          <button type="button" onClick={logout} className="nav-link mt-4 w-full text-rose-600 dark:text-rose-300">
            <LogOut size={18} /> Logout
          </button>
        </aside>

        <main className="min-w-0 pb-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
