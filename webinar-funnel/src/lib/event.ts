/**
 * Single source of truth for the webinar.
 * Nov 4, 2026 falls after the US DST change (Nov 1), so Eastern Time is EST (UTC-5).
 */
export const EVENT = {
  title: 'Free Training: How to Turn Your Treatments into High-Ticket Cash Programs',
  shortTitle: 'How to Turn Your Treatments into High-Ticket Cash Programs',
  start: new Date('2026-11-04T21:00:00-05:00'), // 9:00 PM ET  = 02:00 UTC, Nov 5
  end: new Date('2026-11-04T22:30:00-05:00'), //   10:30 PM ET = 03:30 UTC, Nov 5
  dateLabel: 'Wednesday, November 4',
  timeLabel: '9:00 PM ET',
  location: 'Online (join link sent by email)',
  description:
    'Free live training for chiropractors and physical therapists. Your private join link is in your confirmation email. Join a few minutes early so you are settled when we start.',
};
