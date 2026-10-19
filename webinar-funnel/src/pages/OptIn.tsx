import { Check, X } from 'lucide-react';
import Brand from '../components/Brand';
import ThemeToggle from '../components/ThemeToggle';
import Countdown from '../components/Countdown';
import Form from '../components/Form';
import SaveSeatButton from '../components/SaveSeatButton';
import StickyCTA from '../components/StickyCTA';
import VideoBlock from '../components/VideoBlock';
import ResultCards, { OPTIN_RESULTS } from '../components/ResultCards';
import Footer from '../components/Footer';
import { VIDEOS } from '../lib/event';

/* ------------------------------------------------------------------ */
/* Copy (brief Section 4). `desktopOnly` items are hidden on phones.    */
/* ------------------------------------------------------------------ */

const STATS = [
  { value: '500+', label: 'clinics we run patient marketing for' },
  { value: '70+', label: 'templates, scripts and trackers in the toolkit' },
  { value: '3+', label: 'years running patient marketing for chiropractors' },
];

const FAMILIAR = [
  { quote: 'The agency ran the same new-patient special they run for everyone.' },
  { quote: "I hired someone in-house. Fewer leads, and I couldn't tell if it was the ads or the follow-up.", desktopOnly: true },
  { quote: 'My best treatments get no marketing at all. I sell them one visit at a time.', desktopOnly: true },
  { quote: 'When I fired the agency, I lost the ad account, the pixel and every ad they made.' },
];

const PLAYBOOK = [
  {
    title: 'Your Cash Program, built in front of you',
    bullets: [
      { text: 'Take one treatment you already offer and turn it into a $4,000+ program' },
      { text: 'See how to price it, package it and present financing so it reads as about $50 a week' },
      { text: 'See the page that sells it', desktopOnly: true },
    ],
  },
  {
    title: 'The Campaign That Fills It',
    bullets: [
      { text: 'The campaign structure behind 500+ clinics, launched from a template' },
      { text: 'Video ads made with AI in an afternoon. No film crew, no editor' },
      { text: 'The wording Meta approves for clinics, and the wording that gets accounts shut down' },
      { text: 'An ad account, pixel and audience you own' },
    ],
  },
  {
    title: 'The Follow-Up That Turns Leads Into Patients',
    bullets: [
      { text: 'The five-minute rule and the exact call and text cadence' },
      { text: 'Sequences that chase every lead for you', desktopOnly: true },
      { text: "An AI agent that texts leads and books them while you're with patients" },
      { text: 'The scripts that bring no-shows back' },
    ],
  },
  {
    title: 'The Numbers That Make You Impossible to Fool',
    bullets: [
      { text: 'What a lead, a booking and a show should cost' },
      { text: 'A 10-minute daily check', desktopOnly: true },
      { text: 'Our kill, keep or scale rules' },
    ],
  },
];

const TOOLKIT = [
  { title: 'Campaign Templates', description: 'Ready-built campaigns by treatment. Pick one, set the budget, go live.' },
  { title: 'The Ad Copy Library', description: 'Proven ad copy and hook formulas from our clinic campaigns.' },
  { title: 'AI Ad Prompts', description: 'Copy-paste prompts for video ads, voiceovers and static ads.' },
  { title: 'The Call Script Pack', description: 'First-call script with objection lines, front desk version, and the no-show and cancellation scripts.' },
  { title: 'The Daily Tracker', description: 'One spreadsheet for spend, leads, bookings, shows and revenue.' },
  { title: 'The Calculators', description: 'Ad budget, return on ad spend and patient lifetime value.' },
  { title: 'The Benchmark Table', description: 'Our numbers for what "good" looks like, by treatment.' },
  { title: 'The 14-Day Launch Plan', description: 'Day by day, from zero to your first ads live.' },
  { title: 'The Front Desk Kit', description: 'Daily call panel, end-of-day report and a cheat sheet for the phone.' },
];

const FREE_ITEMS = [
  { title: 'The Cash Program Template', description: 'The full build from the night, ready to copy.' },
  { title: 'The Numbers Cheat Sheet', description: 'Our benchmarks on one page.' },
  { title: 'The New-Lead Call Script', description: 'The first-call script, word for word.' },
  { title: 'Your First Lesson, Before Wednesday', description: 'In your inbox as soon as you register.' },
];

const COMPARISON = [
  { them: 'One clinic', us: '500+ clinics' },
  { them: 'One town', us: 'Markets across the US' },
  { them: 'What worked for them once', us: 'What patients are buying this month' },
];

const FOR_YOU = [
  'You own or run an established chiropractic clinic',
  "You've paid an agency or a marketing hire and have little to show for it",
  'You have at least one treatment you could sell as a cash program',
  "You'll put a real ad budget behind marketing you control",
  'You, or someone on your team, will actually run it',
];

const NOT_FOR_YOU = [
  "You're looking for a trick",
  'You want to hand it all off and never look at a number',
  'You plan to watch and change nothing',
];

const FAQS = [
  {
    q: "I'm not technical. Can I do this?",
    a: 'Yes. The campaigns launch from templates and the ads come from copy-paste prompts. You or someone on your team can run it.',
  },
  {
    q: 'Are you going to sell me something?',
    a: "At the end we'll explain how we can help you put this in place, if you want that. You won't need to buy anything to use what you learn. And if you do join the program, you don't pay another dollar for it until it's paid for itself.",
  },
];

/* Shared type styles */
const h2 = 'font-display text-[29px] font-extrabold leading-[1.05] tracking-[-0.01em]';
const phoneButton = 'w-full !px-5 !py-[18px] !text-lg';

/** Mobile-only proof right above the form (keeps the conversion pass). */
const PROOF = OPTIN_RESULTS[0];

export default function OptIn() {
  return (
    <div className="min-h-screen pb-28 lg:pb-0">
      <header className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 pt-5 sm:px-6 lg:pt-7">
        <Brand />
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6 lg:pt-7">
        {/*
          Phone order: hero → stats/familiar/playbook → FORM → toolkit and everything below.
          Desktop: content in column 1, form pinned in column 2 for the whole scroll.
        */}
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-x-10">
          {/* ---------------- HERO ---------------- */}
          <section className="flex flex-col gap-[18px] lg:col-start-1 lg:row-start-1">
            <span className="self-start rounded-full border border-tag-line bg-tag px-[18px] py-2 text-[12px] font-bold tracking-[0.1em] text-tag-ink backdrop-blur-md sm:text-[13px]">
              FREE LIVE WORKSHOP FOR CHIROPRACTORS
            </span>

            <h1 className="font-display text-[50px] font-extrabold leading-[0.98] tracking-[-0.02em] text-accent-ink lg:text-[92px]">
              Burned by Agencies?
            </h1>
            <p className="font-display text-[25px] font-extrabold leading-[1.15] tracking-[-0.01em] lg:text-[38px]">
              Learn to Run Your Own Marketing, and Turn the Treatments You Already Offer Into High-Ticket Cash Programs
            </p>
            <p className="max-w-[720px] text-lg leading-[1.45] text-ink-2 lg:text-[21px]">
              We run patient marketing for 500+ clinics. In this free live workshop we open up the whole engine, piece by
              piece, so you leave knowing exactly how it works and how to run it in your clinic.
            </p>
            <p className="text-base font-bold lg:text-[17px]">
              The In-House Marketing Workshop · Live, Wednesday November 4 at 9 PM Eastern
            </p>

            <VideoBlock
              title="Why we're giving away the playbook we run for 500+ clinics"
              note="[VSL VIDEO · about 7 min · with chapters]"
              embedUrl={VIDEOS.vsl}
            />

            {/* Phone only. Also tells the sticky bar to stay hidden while it's on screen. */}
            <div id="hero-cta" className="lg:hidden">
              <SaveSeatButton label="Save My Seat. It's Free →" className={phoneButton} />
            </div>

            <div className="glass flex flex-col gap-3 rounded-xl px-5 py-[18px]">
              <p className="text-sm font-bold tracking-[0.08em] text-ink-3">WORKSHOP STARTS IN</p>
              <Countdown />
              <p className="text-base font-bold">Live · Not recorded · No replay · Seats capped</p>
            </div>
          </section>

          {/* ---------------- CONTENT, PART A ---------------- */}
          <div className="flex flex-col gap-7 lg:col-start-1 lg:row-start-2">
            {/* 1. Stats */}
            <div className="grid grid-cols-3 gap-2 lg:gap-4">
              {STATS.map((s) => (
                <div key={s.value} className="glass rounded-xl px-2.5 py-3 lg:p-[22px]">
                  <div className="font-display text-[30px] font-extrabold leading-none text-accent-ink lg:text-[52px]">{s.value}</div>
                  <div className="mt-1.5 text-xs font-semibold leading-snug lg:mt-2.5 lg:text-[17px]">{s.label}</div>
                </div>
              ))}
            </div>

            {/* 2. Sound familiar? */}
            <section className="flex flex-col gap-[18px]">
              <h2 className={`${h2} lg:text-[40px]`}>Sound familiar?</h2>
              <div className="grid gap-2.5 lg:grid-cols-2 lg:gap-4">
                {FAMILIAR.map((f) => (
                  <div
                    key={f.quote}
                    className={`glass rounded-xl px-4 py-3.5 text-[17px] font-semibold leading-[1.4] lg:p-[22px] lg:text-xl ${
                      f.desktopOnly ? 'hidden lg:block' : ''
                    }`}
                  >
                    “{f.quote}”
                  </div>
                ))}
              </div>
              <p className="text-lg font-bold leading-[1.4] lg:text-[22px]">
                Nobody will ever care about this as much as you do. So learn it once, and own it.
              </p>
            </section>

            {/* 3. The playbook */}
            <section className="glass flex flex-col gap-6 rounded-2xl p-5 lg:p-8">
              <div className="flex flex-col gap-2.5">
                <h2 className={`${h2} lg:text-[44px]`}>The Whole Playbook. Opened Up for One Night.</h2>
                <p className="text-lg leading-[1.45] text-ink-2 lg:text-xl">
                  Clinics pay us every month to run this. On Wednesday you'll watch us build it, piece by piece, and leave
                  knowing how to run it yourself.
                </p>
              </div>
              <p className="text-sm font-bold tracking-[0.08em] text-ink-3">WHAT WE'LL BUILD AND SHOW YOU LIVE</p>
              <div className="grid gap-4 lg:grid-cols-2">
                {PLAYBOOK.map((part, i) => (
                  <div key={part.title} className="flex flex-col gap-3 rounded-xl border border-line/60 bg-soft p-5 lg:p-[22px]">
                    <p className="font-display text-lg font-extrabold text-accent-ink">PART {i + 1}</p>
                    <h3 className="font-display text-[22px] font-extrabold leading-[1.15] lg:text-[26px]">{part.title}</h3>
                    <ul className="flex list-disc flex-col gap-2 pl-5 text-base leading-[1.4] lg:text-[17px]">
                      {part.bullets.map((b) => (
                        <li key={b.text} className={b.desktopOnly ? 'hidden lg:list-item' : ''}>
                          {b.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <SaveSeatButton mobileOnly label="Save My Seat. It's Free →" className={phoneButton} />
            </section>
          </div>

          {/* ---------------- FORM ---------------- */}
          <aside className="lg:col-start-2 lg:row-span-3 lg:row-start-1">
            <figure className="glass mb-4 flex flex-col gap-1 rounded-xl px-4 py-3 lg:hidden">
              <figcaption className="text-[13px] font-bold text-ink-3">{PROOF.name}</figcaption>
              <p className="text-[15px] leading-snug">
                <span className="font-display font-extrabold text-accent-ink">{PROOF.headline}.</span> {PROOF.description}
              </p>
            </figure>
            <div className="lg:sticky lg:top-2 lg:-m-4 lg:max-h-[calc(100vh-1rem)] lg:overflow-y-auto lg:p-4 lg:[scrollbar-width:none]">
              <Form />
            </div>
          </aside>

          {/* ---------------- CONTENT, PART B ---------------- */}
          <div className="flex flex-col gap-7 lg:col-start-1 lg:row-start-3">
            {/* 4. Toolkit */}
            <section className="glass-navy flex flex-col gap-[22px] rounded-2xl p-5 lg:p-8">
              <div className="flex flex-col gap-2.5">
                <h2 className={`${h2} lg:text-[38px]`}>The Toolkit Our Clinics Run On: 70+ Templates, Scripts and Trackers</h2>
                <p className="text-lg leading-[1.45] text-on-navy-2 lg:text-[19px]">
                  Every part of the playbook comes with the tools to run it. On Wednesday we'll show you what's in the kit
                  and how the pieces fit together.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
                {TOOLKIT.map((t) => (
                  <div key={t.title} className="glass-tile rounded-xl p-4 lg:p-5">
                    <h3 className="font-display text-base font-extrabold leading-snug lg:text-xl">{t.title}</h3>
                    <p className="mt-2 hidden text-base leading-[1.4] text-on-navy-2 lg:block">{t.description}</p>
                  </div>
                ))}
              </div>
              <SaveSeatButton mobileOnly label="Save My Seat. It's Free →" className={phoneButton} />
            </section>

            {/* 5. Free items */}
            <section className="glass-frame flex flex-col gap-5 rounded-2xl p-5 lg:p-8">
              <h2 className={`${h2} lg:text-[38px]`}>Yours Free, Just for Being in the Room</h2>
              <div className="grid gap-5 lg:grid-cols-2">
                {FREE_ITEMS.map((item, i) => (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <span className="btn-glass flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-xl font-extrabold">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-[19px] font-extrabold leading-snug lg:text-[21px]">{item.title}</h3>
                      <p className="mt-1 text-base leading-[1.4] text-ink-2 lg:text-[17px]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-base font-bold lg:text-lg">These go only to people still in the room at the end. No replay.</p>
              <SaveSeatButton className="w-full lg:w-auto lg:self-start" />
            </section>

            {/* 6. Why learn it from us */}
            <section className="flex flex-col gap-5">
              <h2 className={`${h2} lg:text-[40px]`}>Why Learn It From Us</h2>

              <div className="glass grid grid-cols-2 overflow-hidden rounded-2xl">
                <div className="border-b border-line px-3 py-3 text-[10.5px] font-bold tracking-[0.1em] text-muted lg:px-6 lg:py-4 lg:text-[13px]">
                  A CHIROPRACTOR WITH A COURSE
                </div>
                <div className="btn-glass !rounded-none !border-0 px-3 py-3 text-[10.5px] font-bold tracking-[0.1em] !shadow-none lg:px-6 lg:py-4 lg:text-[13px]">
                  CONEK MEDIA
                </div>
                {COMPARISON.map((row, i) => {
                  const last = i === COMPARISON.length - 1;
                  return (
                    <div key={row.us} className="contents">
                      <div
                        className={`flex items-center gap-2 px-3 py-3 text-[15px] text-muted lg:gap-3 lg:px-6 lg:py-[18px] lg:text-[19px] ${
                          last ? '' : 'border-b border-line'
                        }`}
                      >
                        <X className="h-4 w-4 shrink-0 lg:h-5 lg:w-5" aria-hidden="true" />
                        <span>
                          <span className="sr-only">Them: </span>
                          {row.them}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-2 bg-good px-3 py-3 text-[15px] font-bold lg:gap-3 lg:px-6 lg:py-[18px] lg:text-[19px] ${
                          last ? '' : 'border-b border-tag-line/40'
                        }`}
                      >
                        <Check className="h-4 w-4 shrink-0 text-accent-ink lg:h-5 lg:w-5" strokeWidth={3} aria-hidden="true" />
                        <span>
                          <span className="sr-only">Conek Media: </span>
                          {row.us}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <ResultCards items={OPTIN_RESULTS} />

              <div className="glass hidden rounded-xl p-[22px] lg:block">
                <h3 className="font-display text-[22px] font-extrabold">Why would an agency give this away?</h3>
                <p className="mt-2 text-[17px] leading-[1.45] text-ink-2">
                  Because the clinics that get results are the ones where the owner understands the numbers. We'd rather
                  teach you than watch you hire a fourth agency.
                </p>
              </div>

              <SaveSeatButton mobileOnly label="Save My Seat. It's Free →" className={phoneButton} />
            </section>

            {/* 7. Who it's for (desktop only) */}
            <section className="hidden gap-4 lg:grid lg:grid-cols-2">
              <div className="glass rounded-xl p-[26px]">
                <h2 className="font-display text-[26px] font-extrabold">This is for you if</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {FOR_YOU.map((t) => (
                    <li key={t} className="flex gap-3 text-[17px] leading-[1.4]">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" strokeWidth={3} aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass rounded-xl p-[26px]">
                <h2 className="font-display text-[26px] font-extrabold">It's not for you if</h2>
                <ul className="mt-4 flex flex-col gap-3">
                  {NOT_FOR_YOU.map((t) => (
                    <li key={t} className="flex gap-3 text-[17px] leading-[1.4] text-ink-2">
                      <X className="mt-0.5 h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 8. Before you register (desktop only) */}
            <section className="hidden flex-col gap-4 lg:flex">
              <h2 className={`${h2} lg:text-[40px]`}>Before You Register</h2>
              {FAQS.map(({ q, a }) => (
                <div key={q} className="glass rounded-xl p-[22px]">
                  <h3 className="font-display text-[21px] font-extrabold">{q}</h3>
                  <p className="mt-2 text-[17px] leading-[1.45] text-ink-2">{a}</p>
                </div>
              ))}
            </section>

            {/* 9. Closing block */}
            <section className="glass-navy flex flex-col items-center gap-4 rounded-2xl p-7 text-center lg:p-12">
              <h2 className="font-display text-[29px] font-extrabold leading-[1.08] lg:text-[48px]">
                Wednesday, November 4. 9 PM Eastern. Live, once.
              </h2>
              <p className="text-lg text-on-navy-2 lg:text-xl">Seats are capped. When the room is full, it's full.</p>
              <SaveSeatButton className="mt-2 w-full sm:w-auto" />
            </section>
          </div>
        </div>
      </main>

      <Footer />
      <StickyCTA />
    </div>
  );
}