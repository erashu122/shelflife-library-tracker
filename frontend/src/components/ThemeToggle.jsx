import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const Icon = theme === 'dark' ? Sun : Moon;

  return (
    <button type="button" onClick={toggleTheme} className="btn-secondary p-3" aria-label="Toggle theme">
      <Icon size={18} />
    </button>
  );
}
