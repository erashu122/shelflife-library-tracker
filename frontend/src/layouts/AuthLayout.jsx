import { BookMarked } from 'lucide-react';
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
        <aside className="glass-panel hidden rounded-lg p-8 lg:block">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-teal-600 text-white">
            <BookMarked size={28} />
          </div>
          <h1 className="mt-8 text-4xl font-bold tracking-normal text-gray-950 dark:text-white">ShelfLife</h1>
          <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Search, organize, rate, and track every book in your personal reading journey.
          </p>
          <div className="mt-10 grid gap-3 text-sm text-gray-600 dark:text-gray-300">
            <span className="rounded-lg bg-white/50 p-4 dark:bg-white/5">JWT protected library</span>
            <span className="rounded-lg bg-white/50 p-4 dark:bg-white/5">Google Books discovery</span>
            <span className="rounded-lg bg-white/50 p-4 dark:bg-white/5">Dashboard metrics and progress</span>
          </div>
        </aside>
        <Outlet />
      </section>
    </main>
  );
}
