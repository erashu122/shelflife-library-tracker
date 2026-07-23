import { ArrowUpRight, BookOpen, CheckCircle2, Flame, Library, Sparkles, Star, Timer } from 'lucide-react';
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
    return (
      <div className="space-y-6">
        <Skeleton className="h-56" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-36" />)}
        </div>
      </div>
    );
  }

  const completionRate = dashboard.totalBooks
    ? Math.round((dashboard.completedBooks / dashboard.totalBooks) * 100)
    : 0;
  const activeRate = dashboard.totalBooks
    ? Math.round((dashboard.currentlyReading / dashboard.totalBooks) * 100)
    : 0;

  return (
    <section className="space-y-6">
      <div className="premium-card animate-riseIn p-6 sm:p-7">
        <div className="relative z-10 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-teal-700 dark:text-teal-300">
              <Sparkles size={14} /> Live Reading Command Center
            </div>
            <h1 className="mt-4 text-4xl font-bold text-gray-950 dark:text-white sm:text-5xl">
              Reading overview
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-300 sm:text-base">
              Track your shelf, measure momentum, and turn every saved book into a clear next action.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-lg bg-white/55 px-4 py-2 text-sm font-semibold dark:bg-white/5">
                {dashboard.totalBooks} books collected
              </span>
              <span className="rounded-lg bg-white/55 px-4 py-2 text-sm font-semibold dark:bg-white/5">
                {completionRate}% completion
              </span>
              <span className="rounded-lg bg-white/55 px-4 py-2 text-sm font-semibold dark:bg-white/5">
                {dashboard.averageRating || 0} avg rating
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-white/45 bg-white/50 p-5 dark:border-white/10 dark:bg-white/5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Reading Momentum</p>
              <Flame className="text-amber-500" size={22} />
            </div>
            <p className="mt-4 text-5xl font-bold text-gray-950 dark:text-white">{activeRate}%</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">of your shelf is actively in progress.</p>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
              <div className="progress-shine h-full rounded-full" style={{ width: `${Math.max(activeRate, 4)}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <StatCard icon={Library} label="Total Books" value={dashboard.totalBooks} accent="teal" delay={40} />
        <StatCard icon={Timer} label="Currently Reading" value={dashboard.currentlyReading} accent="amber" delay={90} />
        <StatCard icon={CheckCircle2} label="Completed" value={dashboard.completedBooks} accent="sky" delay={140} />
        <StatCard icon={BookOpen} label="Want to Read" value={dashboard.wantToRead} accent="violet" delay={190} />
        <StatCard icon={Star} label="Average Rating" value={dashboard.averageRating} accent="rose" delay={240} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="premium-card lift-card animate-riseIn rounded-lg p-5" style={{ animationDelay: '280ms' }}>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-950 dark:text-white">Progress Charts</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Status distribution across your shelf</p>
            </div>
            <ArrowUpRight className="text-teal-500" size={22} />
          </div>
          <div className="relative z-10 mt-6 space-y-5">
            {dashboard.statusCounts.map((item) => {
              const width = dashboard.totalBooks ? Math.round((item.count / dashboard.totalBooks) * 100) : 0;
              return (
                <div key={item.status}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-semibold">{statusLabel(item.status)}</span>
                    <span className="text-gray-500 dark:text-gray-400">{item.count} books</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-200 shadow-inner dark:bg-white/10">
                    <div className="progress-shine h-full rounded-full" style={{ width: `${width}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="premium-card lift-card animate-riseIn rounded-lg p-5" style={{ animationDelay: '330ms' }}>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-950 dark:text-white">Recently Added</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Fresh titles from your latest searches</p>
            </div>
            <BookOpen className="text-teal-500" size={22} />
          </div>
          {dashboard.recentlyAdded.length === 0 ? (
            <p className="relative z-10 mt-5 rounded-lg bg-white/50 p-4 text-sm text-gray-500 dark:bg-white/5 dark:text-gray-400">
              Search Google Books and add your first title to start tracking progress.
            </p>
          ) : (
            <div className="relative z-10 mt-5 grid gap-3">
              {dashboard.recentlyAdded.map((item) => (
                <div key={item.id} className="group flex items-center gap-4 rounded-lg bg-white/60 p-3 transition duration-300 hover:-translate-y-0.5 hover:bg-white/80 dark:bg-white/5 dark:hover:bg-white/10">
                  <img src={item.book.coverImage || 'https://placehold.co/80x120?text=Book'} alt={item.book.title} className="h-20 w-14 rounded-md object-cover shadow-lg transition duration-300 group-hover:scale-105" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-gray-950 dark:text-white">{item.book.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{statusLabel(item.status)} - {item.progress}% complete</p>
                    <div className="mt-2 h-1.5 w-40 max-w-full overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                      <div className="h-full rounded-full bg-teal-500" style={{ width: `${item.progress}%` }} />
                    </div>
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
