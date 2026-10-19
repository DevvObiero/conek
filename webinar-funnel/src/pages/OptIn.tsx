import { CalendarDays, Clock, Check, X, Layers, BadgeDollarSign, Users } from 'lucide-react';
import Brand from '../components/Brand';
import Countdown from '../components/Countdown';
import Form from '../components/Form';
import SaveSeatButton from '../components/SaveSeatButton';
import VideoPlaceholder from '../components/VideoPlaceholder';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { EVENT } from '../lib/event';

const PAINS = [
  'Your calendar is full, yet revenue barely moves month to month.',
  'Patients drop off at visit four or five, right before the real change happens.',
  'Insurance decides what your care is worth, and the number keeps shrinking.',
  'You already know cash care is the answer. You just don’t know how to price or present it.',
];

const LESSONS = [
  {
    icon: Layers,
    title: 'Package what you already do',
    body: 'Turn the treatments you deliver every day into a clear 8 to 12 week program built around one outcome patients care about.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Price it with confidence',
    body: 'A simple way to set a program fee that reflects the result, not the visit count, and how to explain it in under two minutes.',
  },
  {
    icon: Users,
    title: 'Present it so patients say yes',
    body: 'The report-of-findings conversation that moves patients from “how many visits?” to “when do we start?”',
  },
];

const FOR_YOU = [
  'Chiropractors, PTs and integrated clinic owners',
  'Practices doing at least some cash or hybrid care',
  'Owners ready to change how care is offered, not just add more hours',
];
const NOT_FOR_YOU = [
  'Students who don’t yet treat patients',
  'Anyone looking for a billing or coding workaround',
  'Clinics that want to stay fully insurance-based',
];

const FAQS = [
  {
    q: 'Is the training really free?',
    a: 'Yes. There is no cost to attend. Register once and you’ll get the join link and reminders by email.',
  },
  {
    q: 'Will there be a replay?',
    a: 'Attend live if you can. The live session includes Q&A, and replay availability isn’t guaranteed.',
  },
  {
    q: 'I mostly bill insurance. Is this still useful?',
    a: 'Yes. Most clinics start with one cash program alongside their insurance work, and we show you how to choose that first program.',
  },
];

const h2 = 'text-3xl font-semibold tracking-[-0.035em] text-white sm:text-[2.5rem] sm:leading-[1.1]';

export default function OptIn() {
  return (
    <div className="min-h-screen">
      {/* Floating glass nav with countdown */}
      <header className="px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="glass-strong mx-auto flex max-w-6xl flex-col gap-4 rounded-[1.75rem] px-5 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:rounded-full md:py-3 md:pl-6 md:pr-3">
          <Brand />
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <p className="text-[13px] text-white/50">Live training starts in</p>
            <Countdown />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-20">
        {/* Mobile: hero → form (≈1/3 down) → long copy. Desktop: copy left, sticky form right. */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-x-14 lg:gap-y-24 xl:gap-x-20">
          {/* HERO */}
          <section className="lg:col-start-1 lg:row-start-1">
            <p className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] text-white/75">
              <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_2px_rgb(255_255_255/0.6)]" aria-hidden="true" />
              Free live training for chiropractors and physical therapists
            </p>

            <h1 className="mt-7 max-w-[16ch] text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[4rem] lg:text-[4.75rem]">
              Turn your treatments into high-ticket cash programs
            </h1>

            <p className="mt-7 max-w-[54ch] text-lg leading-relaxed text-white/60">
              In 90 minutes, see how clinic owners package the care they already deliver into outcome-based programs
              that patients commit to upfront. No new modalities, no new certifications.
            </p>

            <dl className="mt-8 mb-8 flex flex-wrap gap-3 text-sm">
              <div className="glass flex items-center gap-2.5 rounded-full px-4 py-2">
                <CalendarDays className="h-4 w-4 text-white/60" aria-hidden="true" />
                <dt className="sr-only">Date</dt>
                <dd className="font-medium text-white">{EVENT.dateLabel}</dd>
              </div>
              <div className="glass flex  items-center gap-2.5 rounded-full px-4 py-2">
                <Clock className="h-4 w-4 text-white/60" aria-hidden="true" />
                <dt className="sr-only">Time</dt>
                <dd className="font-medium text-white">9:00 to 10:30 PM ET</dd>
              </div>
            </dl>

       <VideoPlaceholder
  caption="Watch the full webinar"
  duration="12:45"
  coverImage="/images/webinar-cover.png"
  videoUrl="/videos/dog.mp4"
/>
            <SaveSeatButton mobileOnly className="mt-8 w-full sm:w-auto" />
          </section>

          {/* FORM: sticky on desktop */}
          <aside className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="lg:sticky lg:top-8">
              <Form />
            </div>
          </aside>

          {/* LONG-FORM COPY */}
          <div className="space-y-24 lg:col-start-1 lg:row-start-2">
            <section>
              <h2 className={h2}>If this sounds like your week</h2>
              <ul className="mt-8 space-y-3">
                {PAINS.map((p) => (
                  <li key={p} className="glass flex gap-4 rounded-2xl px-5 py-4">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" aria-hidden="true" />
                    <span className="text-base leading-relaxed text-white/85">{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 max-w-[60ch] text-lg leading-relaxed text-white/55">
                The problem isn’t your clinical skill. It’s that you’re selling care one visit at a time, which invites
                patients to judge every appointment on its own. Programs change the question from “is this visit worth
                it?” to “is this result worth it?”
              </p>
            </section>

            <section>
              <h2 className={h2}>What you’ll learn on the training</h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {LESSONS.map(({ icon: Icon, title, body }) => (
                  <div key={title} className="glass rounded-[1.75rem] p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 text-lg font-semibold leading-snug tracking-[-0.02em] text-white">{title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/55">{body}</p>
                  </div>
                ))}
              </div>
              <SaveSeatButton mobileOnly className="mt-10 w-full sm:w-auto" label="Save my seat for Nov 4" />
            </section>

            <section className="grid gap-4 sm:grid-cols-2">
              <div className="glass rounded-[1.75rem] p-7">
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-white">This is for you if</h2>
                <ul className="mt-5 space-y-3.5">
                  {FOR_YOU.map((t) => (
                    <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-white/85">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 p-7">
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-white/70">It’s not a fit if</h2>
                <ul className="mt-5 space-y-3.5">
                  {NOT_FOR_YOU.map((t) => (
                    <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-white/45">
                      <X className="mt-0.5 h-5 w-5 shrink-0 text-white/30" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="glass flex flex-col gap-6 rounded-[2rem] p-7 sm:flex-row sm:items-center sm:p-9">
              <div
                className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white text-2xl font-semibold tracking-[-0.03em] text-black"
                aria-hidden="true"
              >
                HN
              </div>
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.02em] text-white">Your host: Dr. Host Name</h2>
                <p className="mt-2 max-w-[60ch] text-[15px] leading-relaxed text-white/55">
                  Replace this with the host’s short bio: years in practice, the clinic they built, and why they moved to
                  program-based care. Two or three sentences is plenty.
                </p>
              </div>
            </section>

            <section>
              <h2 className={h2}>What clinic owners say</h2>
              <div className="mt-8">
                <Testimonials />
              </div>
            </section>

            <section>
              <h2 className={h2}>Questions</h2>
              <div className="glass mt-8 divide-y divide-white/10 rounded-[1.75rem]">
                {FAQS.map(({ q, a }) => (
                  <details key={q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-white">
                      {q}
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-lg leading-none text-white/70 transition-transform group-open:rotate-45"
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-white/55">{a}</p>
                  </details>
                ))}
              </div>
            </section>

            <section className="glass-strong rounded-[2rem] p-8 text-center sm:p-12 lg:text-left">
              <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2.75rem] sm:leading-[1.05]">
                Your seat is free. Spots on the live call are limited.
              </h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-lg text-white/55 lg:mx-0">
                {EVENT.dateLabel} at {EVENT.timeLabel}. Bring one patient case in mind and we’ll build a program around it
                together.
              </p>
              <SaveSeatButton className="mt-8 w-full sm:w-auto lg:hidden" />
              <p className="mt-8 hidden text-sm text-white/45 lg:block">Use the form on the right to register.</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
