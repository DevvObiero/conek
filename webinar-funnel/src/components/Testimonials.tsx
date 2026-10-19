export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

/** Replace with real, permissioned testimonials before launch. Add a card by adding an object. */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'I stopped selling visits and started selling outcomes. Patients commit to the whole plan now, and my schedule finally reflects that.',
    name: 'Dr. Alana R.',
    role: 'Chiropractor, solo practice',
    initials: 'AR',
  },
  {
    quote:
      'We moved two of our most common conditions into cash programs. Fewer insurance fights, more time with patients who actually want to get better.',
    name: 'Marcus T., DPT',
    role: 'PT clinic owner, 3 providers',
    initials: 'MT',
  },
  {
    quote:
      'The pricing framework alone was worth it. I had been undercharging for care I was already delivering every single day.',
    name: 'Dr. Priya S.',
    role: 'Integrated practice',
    initials: 'PS',
  },
];

function TestimonialCard({ quote, name, role, initials }: Testimonial) {
  return (
    <figure className="glass flex h-full flex-col rounded-[1.75rem] p-6 sm:p-7">
      <span className="text-4xl font-semibold leading-none text-white/25" aria-hidden="true">
        “
      </span>
      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-white/80">{quote}</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xs font-semibold text-black">
          {initials}
        </span>
        <span>
          <span className="block text-sm font-medium text-white">{name}</span>
          <span className="block text-xs text-white/45">{role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials({ items = TESTIMONIALS }: { items?: Testimonial[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((t) => (
        <TestimonialCard key={t.name} {...t} />
      ))}
    </div>
  );
}
