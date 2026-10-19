/**
 * Theme store. index.html sets the theme before first paint (light unless the
 * visitor chose dark). This module reads/writes it and keeps toggles in sync.
 */
import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const listeners = new Set<() => void>();
const META_COLOR: Record<Theme, string> = { light: '#F1F5F9', dark: '#0F172A' };

function read(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLOR[theme]);
  listeners.forEach((l) => l());
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* storage unavailable: theme still applies for this visit */
  }
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  if (doc.startViewTransition && !reduceMotion) doc.startViewTransition(() => apply(theme));
  else apply(theme);
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, read, () => 'light' as Theme);
  return { theme, setTheme, toggle: () => setTheme(theme === 'dark' ? 'light' : 'dark') };
}