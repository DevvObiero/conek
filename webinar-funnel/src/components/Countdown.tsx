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
  /** Defaults to Wed Nov 4, 2026, 9:00 PM Eastern. */
  target?: Date;
  /** boxes: the four navy boxes. inline: one line of text (sticky bar). */
  size?: 'boxes' | 'inline';
  className?: string;
};

export default function Countdown({ target = EVENT.start, size = 'boxes', className = '' }: CountdownProps) {
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
    if (size === 'inline') return <span className={`font-bold ${className}`}>Live now</span>;
    return <p className={`text-lg font-bold ${className}`}>The workshop is live now. Your join link is in your email.</p>;
  }

  const units = [
    { label: 'DAYS', short: 'd', value: pad(time.days) },
    { label: 'HOURS', short: 'h', value: pad(time.hours) },
    { label: 'MINS', short: 'm', value: pad(time.minutes) },
    { label: 'SECS', short: 's', value: pad(time.seconds) },
  ];

  if (size === 'inline') {
    return (
      <span className={`whitespace-nowrap font-bold tabular-nums ${className}`}>
        <span className="sr-only">
          {time.days} days, {time.hours} hours and {time.minutes} minutes
        </span>
        <span aria-hidden="true">{units.map((u) => `${u.value}${u.short}`).join(' ')}</span>
      </span>
    );
  }

  return (
    <div className={className}>
      <span className="sr-only">
        Starts in {time.days} days, {time.hours} hours and {time.minutes} minutes.
      </span>
      <div className="grid grid-cols-4 gap-2 sm:gap-3" aria-hidden="true">
        {units.map((u) => (
          <div key={u.label} className="glass-navy rounded-lg px-2 py-3 text-center sm:py-3.5">
            <div className="font-display text-[30px] font-extrabold leading-none tabular-nums sm:text-[40px]">{u.value}</div>
            <div className="mt-1.5 text-[11px] tracking-[0.08em] text-on-navy-2 sm:text-[13px]">{u.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}