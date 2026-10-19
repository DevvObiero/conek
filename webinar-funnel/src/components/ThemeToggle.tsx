import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../lib/theme';

/** Glass pill switch: sun on the left, moon on the right, solid knob marks the active theme. */
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label="Light mode"
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      onClick={toggle}
      className={`glass relative inline-flex h-9 w-[4.25rem] shrink-0 items-center rounded-full p-1 ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-1 h-7 w-7 rounded-full bg-ink shadow-[0_2px_8px_rgb(0_0_0/0.25)] transition-transform duration-300 ease-[cubic-bezier(.3,1.4,.5,1)] motion-reduce:transition-none ${
          isLight ? 'translate-x-0' : 'translate-x-8'
        }`}
      />
      <span className="relative z-10 flex w-full justify-between" aria-hidden="true">
        <span className="flex h-7 w-7 items-center justify-center">
          <Sun className={`h-3.5 w-3.5 transition-colors ${isLight ? 'text-canvas' : 'text-ink/45'}`} />
        </span>
        <span className="flex h-7 w-7 items-center justify-center">
          <Moon className={`h-3.5 w-3.5 transition-colors ${isLight ? 'text-ink/45' : 'text-canvas'}`} />
        </span>
      </span>
    </button>
  );
}