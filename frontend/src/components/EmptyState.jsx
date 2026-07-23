import { BookOpen } from 'lucide-react';

export default function EmptyState({ title, message, action }) {
  return (
    <div className="premium-card animate-riseIn rounded-lg px-6 py-12 text-center">
      <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-teal-500/12 text-teal-700 shadow-glow dark:text-teal-300">
        <BookOpen size={26} />
      </div>
      <h2 className="relative z-10 mt-5 text-xl font-bold text-gray-950 dark:text-white">{title}</h2>
      <p className="relative z-10 mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">{message}</p>
      {action && <div className="relative z-10 mt-6">{action}</div>}
    </div>
  );
}
