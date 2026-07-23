import { BookMarked, ChartNoAxesCombined, LockKeyhole, Search } from 'lucide-react';
import { Navigate, Outlet } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { useAuth } from '../context/AuthContext';

export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="absolute right-5 top-5">
        <ThemeToggle />
      </div>
      <section className="grid w-full max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="premium-card animate-riseIn hidden rounded-lg p-8 lg:block">
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-glow">
            <BookMarked size={28} />
          </div>
          <h1 className="relative z-10 mt-8 text-5xl font-bold tracking-normal text-gray-950 dark:text-white">ShelfLife</h1>
          <p className="relative z-10 mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Search, organize, rate, and track every book in your personal reading journey.
          </p>
          <div className="relative z-10 mt-10 grid gap-3 text-sm text-gray-600 dark:text-gray-300">
            <span className="flex items-center gap-3 rounded-lg bg-white/50 p-4 dark:bg-white/5"><LockKeyhole size={18} /> JWT protected library</span>
            <span className="flex items-center gap-3 rounded-lg bg-white/50 p-4 dark:bg-white/5"><Search size={18} /> Google Books discovery</span>
            <span className="flex items-center gap-3 rounded-lg bg-white/50 p-4 dark:bg-white/5"><ChartNoAxesCombined size={18} /> Dashboard metrics and progress</span>
          </div>
        </aside>
        <Outlet />
      </section>
    </main>
  );
}
