import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight, CalendarDays, Check, Clock } from 'lucide-react';
import Brand from '../components/Brand';
import ThemeToggle from '../components/ThemeToggle';
import CalendarButtons from '../components/CalendarButtons';
import VideoBlock from '../components/VideoBlock';
import ResultCards, { CONFIRM_RESULTS } from '../components/ResultCards';
import TestimonialVideos from '../components/TestimonialVideos';
import { CalendarInviteExample, ZoomConfirmationExample } from '../components/ExampleImages';
import Footer from '../components/Footer';
import { EVENT, LINKS, TEXT_NUMBER, VIDEOS } from '../lib/event';

const h2 = 'font-display text-[28px] font-extrabold leading-[1.1] sm:text-[38px]';

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col items-center gap-3.5 text-center" aria-labelledby={`step-${n}`}>
      <span className="rounded-full border border-tag-line bg-tag px-4 py-1.5 text-[13px] font-bold tracking-[0.1em] text-tag-ink">
        STEP {n} OF 4
      </span>
      <h2 id={`step-${n}`} className={h2}>
        {title}
      </h2>
      {children}
    </section>
  );
}

const NOTES = [
  {
    title: 'Your join link is in your email',
    body: "It's in the confirmation email and the calendar invite. It won't be in our texts.",
  },
  {
    title: 'Save this number',
    body: `${TEXT_NUMBER}. Our reminders come from it, so you'll know it's us.`,
  },
  { title: 'Join from a laptop', body: "Not your phone. You'll want to see the screen." },
];

const COME_READY = [
  {
    title: 'Bring three things',
    body: "The treatments you offer, what you charge for them now, and whoever runs your marketing if it isn't you.",
  },
  {
    title: 'Check your inbox today',
    body: "Your first lesson is already there, so you're not starting from zero on Wednesday.",
  },
  {
    title: 'Stay to the end',
    body: "That's when the Cash Program Template, the Numbers Cheat Sheet and the New-Lead Call Script go out. People in the room only.",
  },
];

export default function Confirmation() {
  const location = useLocation();
  const firstName = (location.state as { firstName?: string } | null)?.firstName;

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-[920px] items-center justify-between gap-4 px-4 pt-5 sm:px-6 sm:pt-8">
        <Brand />
        <ThemeToggle />
      </header>

      <main className="mx-auto flex max-w-[920px] flex-col gap-14 px-4 pt-8 sm:px-6">
        {/* Top */}
        <div className="flex flex-col items-center gap-[18px] text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-tag-line bg-tag">
            <Check className="h-8 w-8 text-accent-ink" strokeWidth={3} aria-hidden="true" />
          </span>
          <h1 className="font-display text-[34px] font-extrabold leading-[1.05] tracking-[-0.02em] sm:text-[52px]">
            {firstName ? `You're Registered, ${firstName}!` : "You're Registered!"}
          </h1>
          <p className="glass-navy flex flex-wrap items-center justify-center gap-2 rounded-full px-[22px] py-[11px] text-base font-bold">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            <span>{EVENT.shortDate}</span>
            <span className="text-tag-line" aria-hidden="true">
              •
            </span>
            <Clock className="h-4 w-4" aria-hidden="true" />
            <span>{EVENT.time} — Live</span>
          </p>
        </div>

        {/* Step 1 */}
        <Step n={1} title="Watch This First">
          <VideoBlock className="w-full" note="[CONFIRMATION VIDEO · about 5 min · with chapters]" embedUrl={VIDEOS.confirmation} />
          <p className="text-lg font-bold leading-[1.4] text-accent-strong">
            Important: add the workshop to your calendar now. Your join link is in the invite.
          </p>
        </Step>

        {/* Step 2 */}
        <Step n={2} title="Confirm Your Workshop Details">
          <div id="calendar" className="glass flex w-full scroll-mt-6 flex-col items-center gap-4 rounded-2xl px-4 py-7 sm:px-6">
            <p className="text-[17px] text-ink-2">Your calendar invite includes the Zoom link for the workshop.</p>
            <p className="text-[19px] font-bold leading-[1.35] sm:text-[21px]">
              The workshop is on {EVENT.longDate} at {EVENT.time}
            </p>
            <CalendarButtons />
          </div>

          <div className="grid w-full gap-4 text-left md:grid-cols-2">
            <div className="glass flex flex-col gap-2.5 rounded-2xl p-[22px]">
              <h3 className="font-display text-[21px] font-extrabold">Calendar Invite</h3>
              <p className="text-base leading-[1.45] text-ink-2">
                Accept the invitation so the workshop and join link stay on your calendar.
              </p>
              <CalendarInviteExample />
            </div>
            <div className="glass flex flex-col gap-2.5 rounded-2xl p-[22px]">
              <h3 className="font-display text-[21px] font-extrabold">Zoom Confirmation</h3>
              <p className="text-base leading-[1.45] text-ink-2">Use the Zoom link in your invitation to join the live workshop.</p>
              <ZoomConfirmationExample />
            </div>
          </div>

          <div className="grid w-full gap-4 text-left md:grid-cols-3">
            {NOTES.map((n) => (
              <div key={n.title} className="glass rounded-[14px] p-5">
                <h3 className="font-display text-[19px] font-extrabold">{n.title}</h3>
                <p className="mt-1.5 text-base leading-[1.45] text-ink-2">{n.body}</p>
              </div>
            ))}
          </div>
        </Step>

        {/* Step 3 */}
        <Step n={3} title="Come Ready">
          <div className="grid w-full gap-4 text-left md:grid-cols-3">
            {COME_READY.map((c) => (
              <div key={c.title} className="glass-navy rounded-[14px] p-[22px]">
                <h3 className="font-display text-[21px] font-extrabold">{c.title}</h3>
                <p className="mt-2 text-base leading-[1.5] text-on-navy-2">{c.body}</p>
              </div>
            ))}
          </div>
        </Step>

        {/* Step 4 */}
        <Step n={4} title="What Happens When Doctors Run This">
          <div className="w-full">
            <ResultCards items={CONFIRM_RESULTS} columns={3} />
          </div>
          <h3 className="mt-6 font-display text-2xl font-extrabold sm:text-[28px]">Hear It From the Clinics We Work With</h3>
          <TestimonialVideos />
        </Step>

        {/* See more (Christos to confirm this block stays) */}
        <section className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-2xl font-extrabold sm:text-[28px]">See More of Us Before Wednesday</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-lg font-extrabold"
            >
              YouTube <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-display text-lg font-extrabold"
            >
              Instagram <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}