import { BookOpen, CheckCircle2, Library, Star, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';
import Skeleton from '../components/Skeleton';
import StatCard from '../components/StatCard';
import { dashboardService } from '../services/dashboardService';
import { statusLabel } from '../utils/constants';

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardService.get().then(setDashboard).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-36" />)}</div>;
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-teal-700 dark:text-teal-300">Dashboard</p>
        <h1 className="mt-1 text-3xl font-bold text-gray-950 dark:text-white">Reading overview</h1>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={Library} label="Total Books" value={dashboard.totalBooks} />
        <StatCard icon={Timer} label="Currently Reading" value={dashboard.currentlyReading} />
        <StatCard icon={CheckCircle2} label="Completed" value={dashboard.completedBooks} />
        <StatCard icon={BookOpen} label="Want to Read" value={dashboard.wantToRead} />
        <StatCard icon={Star} label="Average Rating" value={dashboard.averageRating} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="glass-panel rounded-lg p-5">
          <h2 className="text-lg font-bold text-gray-950 dark:text-white">Progress Charts</h2>
          <div className="mt-5 space-y-4">
            {dashboard.statusCounts.map((item) => {
              const width = dashboard.totalBooks ? Math.round((item.count / dashboard.totalBooks) * 100) : 0;
              return (
                <div key={item.status}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{statusLabel(item.status)}</span>
                    <span>{item.count}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                    <div className="h-full rounded-full bg-teal-600" style={{ width: `${width}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-panel rounded-lg p-5">
          <h2 className="text-lg font-bold text-gray-950 dark:text-white">Recently Added</h2>
          {dashboard.recentlyAdded.length === 0 ? (
            <p className="mt-5 rounded-lg bg-white/50 p-4 text-sm text-gray-500 dark:bg-white/5 dark:text-gray-400">
              Search Google Books and add your first title to start tracking progress.
            </p>
          ) : (
            <div className="mt-5 grid gap-3">
              {dashboard.recentlyAdded.map((item) => (
                <div key={item.id} className="flex items-center gap-4 rounded-lg bg-white/55 p-3 dark:bg-white/5">
                  <img src={item.book.coverImage || 'https://placehold.co/80x120?text=Book'} alt={item.book.title} className="h-16 w-11 rounded object-cover" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{item.book.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{statusLabel(item.status)} - {item.progress}%</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
