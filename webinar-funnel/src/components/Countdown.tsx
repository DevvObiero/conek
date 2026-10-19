import { useEffect, useState } from 'react';
import { EVENT } from '../lib/event';

type Remaining = { total: number; days: number; hours: number; minutes: number; seconds: number };

function getRemaining(target: number): Remaining {
  const total = Math.max(0, target - Date.now());
  return {
    total,
    days: Math.floor(total / 86_400_000),
    hours: Math.floor(total / 3_600_000) % 24,
    minutes: Math.floor(total / 60_000) % 60,
    seconds: Math.floor(total / 1000) % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

type CountdownProps = {
  /** Defaults to Wed Nov 4, 2026, 9:00 PM ET. */
  target?: Date;
  size?: 'sm' | 'lg';
  className?: string;
};

export default function Countdown({ target = EVENT.start, size = 'sm', className = '' }: CountdownProps) {
  const targetMs = target.getTime();
  const [time, setTime] = useState(() => getRemaining(targetMs));

  useEffect(() => {
    setTime(getRemaining(targetMs));
    const id = window.setInterval(() => {
      const next = getRemaining(targetMs);
      setTime(next);
      if (next.total === 0) window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, [targetMs]);

  if (time.total === 0) {
    return (
      <p className={`text-base font-medium text-white ${className}`}>
        The training is live now. Check your email for the join link.
      </p>
    );
  }

  const units = [
    { label: 'Days', short: 'd', value: String(time.days) },
    { label: 'Hours', short: 'h', value: pad(time.hours) },
    { label: 'Minutes', short: 'm', value: pad(time.minutes) },
    { label: 'Seconds', short: 's', value: pad(time.seconds) },
  ];

  const lg = size === 'lg';

  return (
    <div className={className}>
      <span className="sr-only">
        Starts in {time.days} days, {time.hours} hours and {time.minutes} minutes.
      </span>
      <div className={`flex items-stretch ${lg ? 'gap-2.5 sm:gap-3' : 'gap-1.5'}`} aria-hidden="true">
        {units.map((u) => (
          <div
            key={u.label}
            className={`glass flex flex-col items-center justify-center ${
              lg ? 'min-w-[4.25rem] rounded-2xl px-3 py-3 sm:min-w-[5.25rem]' : 'min-w-[3.25rem] rounded-xl px-2 py-1.5'
            }`}
          >
            <span
              className={`font-semibold leading-none tracking-[-0.04em] text-white tabular-nums ${
                lg ? 'text-3xl sm:text-[2.5rem]' : 'text-lg'
              }`}
            >
              {u.value}
            </span>
            <span className={`text-white/45 ${lg ? 'mt-2 text-xs' : 'mt-0.5 text-[10px]'}`}>
              {lg ? u.label : u.short}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
