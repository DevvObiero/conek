import { useLocation } from 'react-router-dom';
import { Check, Mail, CalendarPlus, ClipboardList, Radio, ArrowUpRight } from 'lucide-react';
import Brand from '../components/Brand';
import ThemeToggle from '../components/ThemeToggle';
import Countdown from '../components/Countdown';
import CalendarButtons from '../components/CalendarButtons';
import VideoPlaceholder from '../components/VideoPlaceholder';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { EVENT } from '../lib/event';

const PRECALL_FORM_URL: string = import.meta.env.VITE_PRECALL_FORM_URL || '#';

const STEPS = [
  {
    icon: Mail,
    title: 'Check your email',
    body: 'Your join link is on its way. If it isn’t in your inbox within 5 minutes, check Promotions or Spam and move it to your primary inbox.',
  },
  {
    icon: CalendarPlus,
    title: 'Add it to your calendar',
    body: 'Block 9:00 to 10:30 PM ET on Wednesday, November 4 so nothing gets booked over it.',
    action: { label: 'Add to calendar', href: '#calendar' },
  },
  {
    icon: ClipboardList,
    title: 'Fill out the pre-call form',
    body: 'Two minutes on your clinic and your most common case. We use it to tailor examples during the live session.',
    action: { label: 'Open the pre-call form', href: PRECALL_FORM_URL, external: true },
  },
  {
    icon: Radio,
    title: 'Show up live',
    body: 'Join 5 minutes early from a laptop if you can, with something to take notes on. The Q&A is only available live.',
  },
];

export default function Confirmation() {
  const location = useLocation();
  const firstName = (location.state as { firstName?: string } | null)?.firstName;

  return (
    <div className="min-h-screen">
      <header className="px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="glass-strong mx-auto flex max-w-6xl items-center justify-between rounded-full py-3 pl-5 pr-3 sm:pl-6">
          <Brand />
          <div className="flex items-center gap-2">
            <span className="glass hidden rounded-full px-3.5 py-1.5 text-[13px] text-ink/70 sm:inline-block">
              {EVENT.dateLabel}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="glass inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-[13px] text-ink/80">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-canvas">
              <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
            </span>
            Registration confirmed
          </span>
          <h1 className="mt-7 text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.05em] text-ink sm:text-[3.5rem]">
            {firstName ? `You’re in, ${firstName}.` : 'You’re in.'} Now watch this short video.
          </h1>
          <p className="mx-auto mt-6 max-w-[54ch] text-lg leading-relaxed text-ink/55">
            It explains how to get the most from the training on {EVENT.dateLabel} at {EVENT.timeLabel}, and what to have
            ready before we go live.
          </p>
        </div>

        <VideoPlaceholder
          className="mx-auto mt-12 max-w-3xl"
          caption="Orientation: what to expect and how to prepare."
          duration="4:00"
        />

        {/* Steps */}
        <section className="mx-auto mt-24 max-w-3xl" aria-labelledby="steps-heading">
          <h2
            id="steps-heading"
            className="text-center text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-[2.5rem]"
          >
            Four steps before November 4
          </h2>
          <ol className="relative mt-12 space-y-4">
            <span
              className="absolute bottom-10 left-6 top-10 w-px bg-gradient-to-b from-ink/30 via-ink/10 to-transparent sm:left-7"
              aria-hidden="true"
            />
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="relative flex gap-4 sm:gap-6">
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-lg font-semibold tracking-[-0.03em] text-canvas shadow-[0_0_0_6px_var(--canvas)] sm:h-14 sm:w-14 sm:text-xl">
                    {i + 1}
                  </span>
                  <div className="glass flex-1 rounded-[1.5rem] p-5 text-left sm:p-6">
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-[18px] w-[18px] text-ink/60" aria-hidden="true" />
                      <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink">{step.title}</h3>
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/55">{step.body}</p>
                    {step.action && (
                      <a
                        href={step.action.href}
                        {...(step.action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="glass mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-ink transition hover:bg-ink/10"
                      >
                        {step.action.label}
                        {step.action.external && <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* Calendar */}
        <section
          id="calendar"
          className="glass-strong mx-auto mt-24 max-w-3xl scroll-mt-8 rounded-[2rem] p-7 sm:p-10"
          aria-labelledby="calendar-heading"
        >
          <h2 id="calendar-heading" className="text-2xl font-semibold tracking-[-0.03em] text-ink">
            Add the training to your calendar
          </h2>
          <p className="mt-2 text-[15px] text-ink/55">{EVENT.dateLabel}, 9:00 to 10:30 PM ET. Online.</p>
          <div className="mt-7">
            <CalendarButtons />
          </div>
          <div className="mt-9 border-t border-ink/10 pt-7">
            <p className="mb-4 text-[13px] text-ink/50">Starts in</p>
            <Countdown size="lg" />
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto mt-28 max-w-6xl" aria-labelledby="testimonials-heading">
          <h2
            id="testimonials-heading"
            className="text-center text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-[2.5rem]"
          >
            Clinic owners who made the switch
          </h2>
          <div className="mt-12">
            <Testimonials />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}