import { useEffect, useState } from 'react';
import Countdown from './Countdown';
import { FORM_ID, goToForm } from './SaveSeatButton';

/** While any of these is on screen, the bar stays hidden. */
const WATCH_IDS = ['hero-cta', FORM_ID];

/** Phone-only bar fixed to the bottom of the screen: countdown + Save My Seat. */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = WATCH_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!targets.length) return;

    const onScreen = new Map<Element, boolean>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => onScreen.set(e.target, e.isIntersecting));
      const anyVisible = [...onScreen.values()].some(Boolean);
      setVisible(!anyVisible);
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
      {/* Solid-ish base so busy content behind the bar can't hurt readability */}
      <div className="mx-auto max-w-lg rounded-full bg-canvas/85">
        <div className="glass flex items-center justify-between gap-3 rounded-full py-2 pl-5 pr-2">
          <p className="min-w-0 text-[11px] font-bold leading-tight tracking-[0.08em] text-ink-3">
            STARTS IN
            <Countdown size="inline" className="block text-sm tracking-normal text-ink" />
          </p>
          <a
            href={`#${FORM_ID}`}
            onClick={(e) => {
              e.preventDefault();
              goToForm();
            }}
            className="btn-glass inline-flex shrink-0 items-center rounded-full px-5 py-3 font-display text-base font-extrabold"
          >
            Save My Seat
          </a>
        </div>
      </div>
    </div>
  );
}