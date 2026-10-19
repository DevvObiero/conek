/**
 * Illustrated examples for the confirmation page (not real screenshots).
 * They stay light in dark mode on purpose, like a screenshot would.
 */
import { EVENT } from '../lib/event';

function ExampleNote() {
  return (
    <span className="absolute right-2 top-2 rounded-full bg-[#0F172A]/75 px-2 py-0.5 text-[10px] font-semibold text-white">
      Example only
    </span>
  );
}

export function CalendarInviteExample() {
  return (
    <div className="relative flex aspect-video flex-col justify-between overflow-hidden rounded-[10px] border border-[#D9DEE5] bg-white p-4 text-left text-[#0F172A] shadow-inner">
      <ExampleNote />
      <div>
        <div className="mb-2 h-1.5 w-10 rounded-full bg-[#155EEF]" />
        <p className="font-display text-sm font-extrabold leading-tight sm:text-base">{EVENT.calendarTitle}</p>
        <p className="mt-1 text-[11px] text-[#3B4A5E] sm:text-xs">Wed, Nov 4 · 9:00 – 10:30 PM ET</p>
        <p className="mt-0.5 text-[11px] text-[#3B4A5E] sm:text-xs">Join with Zoom: link in description</p>
      </div>
      <div className="flex items-center gap-2 text-[11px] sm:text-xs">
        <span className="text-[#3B4A5E]">Going?</span>
        <span className="relative rounded-md bg-[#DBEAFE] px-2.5 py-1 font-bold text-[#1E3A8A]">
          Yes
          <span className="absolute -inset-1.5 rounded-full border-2 border-red-500" aria-hidden="true" />
        </span>
        <span className="rounded-md border border-[#D9DEE5] px-2.5 py-1">Maybe</span>
        <span className="rounded-md border border-[#D9DEE5] px-2.5 py-1">No</span>
      </div>
    </div>
  );
}

export function ZoomConfirmationExample() {
  return (
    <div className="relative flex aspect-video flex-col justify-between overflow-hidden rounded-[10px] border border-[#D9DEE5] bg-white p-4 text-left text-[#0F172A] shadow-inner">
      <ExampleNote />
      <div>
        <p className="text-[11px] font-semibold text-[#5B6779] sm:text-xs">Registration confirmed</p>
        <p className="mt-1 font-display text-sm font-extrabold leading-tight sm:text-base">{EVENT.title}</p>
        <p className="mt-1 text-[11px] text-[#3B4A5E] sm:text-xs">Nov 4, 2026 09:00 PM Eastern Time</p>
      </div>
      <div className="text-[11px] sm:text-xs">
        <p className="mb-1 text-[#3B4A5E]">Join from a PC, Mac, iPad or Android:</p>
        <span className="relative inline-block rounded px-1.5 py-1 font-semibold text-[#155EEF]">
          https://zoom.us/w/•••••••••••
          <span className="absolute -inset-1 rounded border-2 border-red-500" aria-hidden="true" />
        </span>
      </div>
    </div>
  );
}