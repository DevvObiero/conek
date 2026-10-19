import { useMemo, useState } from 'react';
import { EVENT, LINKS } from '../lib/event';

/** 2026-11-05T02:00:00.000Z -> 20261105T020000Z */
const toICalUTC = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
/** 2026-11-05T02:00:00Z */
const toISOSeconds = (d: Date) => d.toISOString().replace(/\.\d{3}/, '');

export function buildCalendarLinks() {
  const { calendarTitle: title, description, location, start, end } = EVENT;

  const google =
    'https://calendar.google.com/calendar/render?' +
    new URLSearchParams({
      action: 'TEMPLATE',
      text: title,
      dates: `${toICalUTC(start)}/${toICalUTC(end)}`,
      details: description,
      location,
      ctz: 'America/New_York',
    }).toString();

  const outlookParams = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: title,
    startdt: toISOSeconds(start),
    enddt: toISOSeconds(end),
    body: description,
    location,
  }).toString();

  const yahoo =
    'https://calendar.yahoo.com/?' +
    new URLSearchParams({
      v: '60',
      title,
      st: toICalUTC(start),
      et: toICalUTC(end),
      desc: description,
      in_loc: location,
    }).toString();

  return {
    google,
    outlookCom: `https://outlook.live.com/calendar/0/deeplink/compose?${outlookParams}`,
    office365: `https://outlook.office.com/calendar/0/deeplink/compose?${outlookParams}`,
    yahoo,
    // Apple Calendar and Outlook desktop open the static file in /public (most reliable on iPhone).
    ics: LINKS.calendarFile,
  };
}

type CalendarApp = { key: string; label: string; fallback: string; href: string; external: boolean };

/** Round icon. Uses /images/calendars/<key>.svg if Jeff adds it, otherwise shows the fallback letters. */
function CalendarIcon({ app }: { app: CalendarApp }) {
  const [failed, setFailed] = useState(false);
  return (
    <a
      href={app.href}
      {...(app.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex w-[54px] flex-col items-center gap-1.5 text-ink no-underline sm:w-[76px]"
    >
      <span className="glass flex h-[46px] w-[46px] items-center justify-center overflow-hidden rounded-full transition-transform group-hover:-translate-y-0.5 sm:h-14 sm:w-14">
        {failed ? (
          <span className="font-display text-sm font-extrabold sm:text-[17px]">{app.fallback}</span>
        ) : (
          <img src={`/images/calendars/${app.key}.svg`} alt="" className="h-6 w-6 sm:h-7 sm:w-7" onError={() => setFailed(true)} />
        )}
      </span>
      <span className="whitespace-nowrap text-[10px] font-semibold sm:text-xs">{app.label}</span>
    </a>
  );
}

export default function CalendarButtons() {
  const links = useMemo(buildCalendarLinks, []);

  // Big button: Android goes to Google Calendar, everyone else gets the .ics file.
  const primaryHref = useMemo(
    () => (/Android/i.test(navigator.userAgent) ? links.google : links.ics),
    [links],
  );

  const apps: CalendarApp[] = [
    { key: 'apple', label: 'Apple', fallback: 'A', href: links.ics, external: false },
    { key: 'google', label: 'Google', fallback: 'G', href: links.google, external: true },
    { key: 'office365', label: 'Office 365', fallback: '365', href: links.office365, external: true },
    { key: 'outlook', label: 'Outlook', fallback: 'O', href: links.ics, external: false },
    { key: 'outlookcom', label: 'Outlook.com', fallback: 'O.c', href: links.outlookCom, external: true },
    { key: 'yahoo', label: 'Yahoo', fallback: 'Y', href: links.yahoo, external: true },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <a
        href={primaryHref}
        {...(primaryHref.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="btn-glass inline-flex items-center justify-center rounded-full px-[38px] py-[17px] font-display text-xl font-extrabold"
      >
        Add to Your Calendar
      </a>
      <div className="flex flex-nowrap justify-center gap-1 sm:gap-3.5">
        {apps.map((app) => (
          <CalendarIcon key={app.key} app={app} />
        ))}
      </div>
      <p className="text-sm text-ink-3">Add this workshop to your preferred calendar</p>
    </div>
  );
}