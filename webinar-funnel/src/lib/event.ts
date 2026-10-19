/**
 * Single source of truth for the workshop.
 * Nov 4, 2026 is after the US DST change (Nov 1), so Eastern is EST (UTC-5).
 * 9:00 PM Eastern = 02:00 UTC on Nov 5.
 */
export const EVENT = {
  title: 'The In-House Marketing Workshop',
  calendarTitle: 'The In-House Marketing Workshop (Live)',
  start: new Date('2026-11-04T21:00:00-05:00'),
  // End time is not in the brief. 90 minutes assumed: confirm with Christos.
  end: new Date('2026-11-04T22:30:00-05:00'),
  shortDate: 'Wed November 4',
  longDate: 'Wednesday, November 4, 2026',
  time: '9 PM Eastern',
  location: 'Online (Zoom). Your join link is in your confirmation email.',
  description:
    'The In-House Marketing Workshop, live. Your Zoom join link is in your confirmation email and calendar invite. Join from a laptop a few minutes early.',
};

/** Wistia / Vidalytics embed URLs. Leave empty to show the placeholder. */
export const VIDEOS = {
  vsl: '',
  confirmation: '',
};

/** Placeholders from the brief, Section 7. */
export const LINKS = {
  privacy: '/privacy',
  terms: '/terms',
  youtube: 'https://www.youtube.com/', // [YOUTUBE LINK] from Christos
  instagram: 'https://www.instagram.com/', // [INSTAGRAM LINK] from Christos
  calendarFile: '/workshop.ics',
};

export const TEXT_NUMBER = '[TEXT NUMBER]';