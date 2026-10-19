import { useMemo } from 'react';
import { Apple, CalendarPlus, Mail } from 'lucide-react';
import { EVENT } from '../lib/event';

/** 2026-11-05T02:00:00.000Z -> 20261105T020000Z (iCal / Google format) */
const toICalUTC = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

/** 2026-11-05T02:00:00Z (Outlook deeplink format) */
const toISOSeconds = (d: Date) => d.toISOString().replace(/\.\d{3}/, '');

/** Escape text per RFC 5545 */
const icsEscape = (s: string) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');

export function buildCalendarLinks() {
  const { title, description, location, start, end } = EVENT;

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

  const outlook =
    'https://outlook.live.com/calendar/0/deeplink/compose?' +
    new URLSearchParams({
      path: '/calendar/action/compose',
      rru: 'addevent',
      subject: title,
      startdt: toISOSeconds(start),
      enddt: toISOSeconds(end),
      body: description,
      location,
    }).toString();

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Cash Programs Training//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:cash-programs-training-${toICalUTC(start)}@webinar`,
    `DTSTAMP:${toICalUTC(new Date())}`,
    `DTSTART:${toICalUTC(start)}`,
    `DTEND:${toICalUTC(end)}`,
    `SUMMARY:${icsEscape(title)}`,
    `DESCRIPTION:${icsEscape(description)}`,
    `LOCATION:${icsEscape(location)}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Training starts in 30 minutes',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const apple = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;

  return { google, outlook, apple };
}

const btn =
  'glass flex items-center justify-center gap-2.5 rounded-2xl px-4 py-4 text-sm font-medium text-white transition hover:bg-white/10 active:scale-[0.98]';

export default function CalendarButtons() {
  const links = useMemo(buildCalendarLinks, []);

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <a href={links.google} target="_blank" rel="noopener noreferrer" className={btn}>
        <CalendarPlus className="h-4 w-4 text-white/70" aria-hidden="true" />
        Google Calendar
      </a>
      <a href={links.outlook} target="_blank" rel="noopener noreferrer" className={btn}>
        <Mail className="h-4 w-4 text-white/70" aria-hidden="true" />
        Outlook
      </a>
      <a href={links.apple} download="free-training-nov-4.ics" className={btn}>
        <Apple className="h-4 w-4 text-white/70" aria-hidden="true" />
        Apple Calendar
      </a>
    </div>
  );
}
