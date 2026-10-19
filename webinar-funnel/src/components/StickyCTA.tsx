import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import Countdown from './Countdown';
import { FORM_ID, scrollToForm } from './SaveSeatButton';

/** IDs of elements that, while on screen, make the bar unnecessary. */
const WATCH_IDS = ['hero-cta', FORM_ID];

/**
 * Mobile-only bar fixed to the bottom of the screen.
 * Hidden while the hero button or the form is visible, shown everywhere else.
 */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = WATCH_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!targets.length) return;

    const onScreen = new Map<Element, boolean>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => onScreen.set(e.target, e.isIntersecting));
      const anyVisible = [...onScreen.values()].some(Boolean);
      setVisible(!anyVisible && window.scrollY > 200);
    });

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      inert={!visible}
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] transition-transform duration-300 motion-reduce:transition-none lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-[120%]'
      }`}
    >
      {/* Solid-ish base under the glass so busy content behind the bar can't hurt readability */}
      <div className="mx-auto max-w-lg rounded-full bg-canvas/80">
        <div className="glass-strong flex items-center justify-between gap-3 rounded-full py-2 pl-5 pr-2">
          <p className="min-w-0 text-[13px] leading-tight text-ink/60">
            Starts in
            <Countdown size="inline" className="block text-sm" />
          </p>
          <a
            href={`#${FORM_ID}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToForm();
            }}
            className="btn-primary inline-flex shrink-0 items-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold active:scale-[0.98]"
          >
            Save my seat
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}