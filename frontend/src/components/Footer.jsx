import { BookOpenCheck, Github, Heart } from 'lucide-react';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative z-10 mt-10 border-t border-gray-200/70 pt-6 text-sm text-gray-500 dark:border-white/10 dark:text-gray-400">
      <div className="flex flex-col gap-4 rounded-lg bg-white/45 p-4 shadow-soft backdrop-blur dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-glow">
            <BookOpenCheck size={19} />
          </span>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">ShelfLife</p>
            <p>Designed & developed by Ashutosh Kumar Pandit</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide">
          <span className="inline-flex items-center gap-1">
            <Heart size={14} className="text-rose-500" /> Portfolio Project
          </span>
          <span className="hidden h-4 w-px bg-gray-300 dark:bg-white/20 sm:block" />
          <span className="inline-flex items-center gap-1">
            <Github size={14} /> {currentYear}
          </span>
        </div>
      </div>
    </footer>
  );
}
