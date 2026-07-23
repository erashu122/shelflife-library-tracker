export default function StatCard({ icon: Icon, label, value, detail }) {
  return (
    <article className="glass-panel animate-floatIn rounded-lg p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-gray-950 dark:text-white">{value}</p>
        </div>
        <div className="rounded-lg bg-teal-500/12 p-3 text-teal-700 dark:text-teal-300">
          <Icon size={24} />
        </div>
      </div>
      {detail && <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{detail}</p>}
    </article>
  );
}
