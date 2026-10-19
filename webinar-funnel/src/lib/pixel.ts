/**
 * Meta Pixel utility.
 * Loads fbevents.js once, initialises the pixel lazily, and exposes
 * `pageview()` (route changes) and `event()` (conversions such as Lead).
 */

type FbqFn = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: FbqFn;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

export const PIXEL_ID: string = import.meta.env.VITE_PIXEL_ID || 'TEST_PIXEL_ID';

let initialized = false;

function init(): void {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  if (!window.fbq) {
    // Standard Meta Pixel bootstrap, typed. Calls are queued until fbevents.js loads.
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as FbqFn;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    window.fbq = fbq;
    if (!window._fbq) window._fbq = fbq;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(script);
  }

  window.fbq!('init', PIXEL_ID);
  if (import.meta.env.DEV) console.debug(`[pixel] init ${PIXEL_ID}`);
}

export function pageview(): void {
  init();
  window.fbq?.('track', 'PageView');
  if (import.meta.env.DEV) console.debug('[pixel] PageView', window.location.pathname);
}

export function event(name: string, options: Record<string, unknown> = {}): void {
  init();
  window.fbq?.('track', name, options);
  if (import.meta.env.DEV) console.debug(`[pixel] ${name}`, options);
}
