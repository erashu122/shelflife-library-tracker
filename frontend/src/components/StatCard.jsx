export default function StatCard({ icon: Icon, label, value, detail, accent = 'teal', delay = 0 }) {
  const accents = {
    teal: 'from-teal-500/20 text-teal-700 dark:text-teal-300',
    amber: 'from-amber-500/20 text-amber-700 dark:text-amber-300',
    rose: 'from-rose-500/20 text-rose-700 dark:text-rose-300',
    sky: 'from-sky-500/20 text-sky-700 dark:text-sky-300',
    violet: 'from-violet-500/20 text-violet-700 dark:text-violet-300',
  };

  return (
    <article
      className="premium-card lift-card animate-riseIn rounded-lg p-5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">{value}</p>
        </div>
        <div className={`rounded-lg bg-gradient-to-br to-white/5 p-3 ${accents[accent]}`}>
          <Icon size={24} />
        </div>
      </div>
      {detail && <p className="relative z-10 mt-4 text-sm text-gray-500 dark:text-gray-400">{detail}</p>}
    </article>
  );
}
