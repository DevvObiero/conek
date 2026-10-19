export type Result = { name: string; headline: string; description: string };

/** Opt-in page results (brief Section 6). */
export const OPTIN_RESULTS: Result[] = [
  { name: 'Dr. Ramirez · Texas', headline: '$56,000 collected', description: '14 patients into a $4,000 decompression package in eight weeks.' },
  { name: 'Dr. Jeffrey · Georgia', headline: '11 spots in 30 days', description: 'A $7,000 neuropathy program, filled with ads he made himself.' },
  { name: 'Dr. Lindworth · Arizona', headline: '9 to 31 booked a month', description: 'Same ad budget. He fixed the follow-up.' },
  { name: 'Dr. Oscar · 19 years in practice', headline: '$84,000 best month', description: 'New patient revenue, five months into running it himself.' },
];

/** Confirmation page results (brief Section 5, step 4). */
export const CONFIRM_RESULTS: Result[] = [
  { name: 'Dr. Becky · North Carolina', headline: '9 patients in six weeks', description: 'Signed into a $4,200 shockwave program after bringing her marketing in-house.' },
  { name: 'Dr. Castellano · Florida', headline: '38 appointments in 60 days', description: 'From ads for a $2,500 laser program, with a 74% show rate.' },
  { name: 'Dr. Hudson · Minnesota', headline: '61 new patients in a month', description: 'His best month across two clinics, four months into running it himself.' },
];

export function ResultCard({ name, headline, description, compact = false }: Result & { compact?: boolean }) {
  return (
    <div className="glass flex flex-col gap-2.5 rounded-xl p-5 text-left sm:p-[22px]">
      <p className="text-[15px] font-bold text-ink-3">{name}</p>
      <p className={`font-display font-extrabold leading-[1.05] text-accent-ink ${compact ? 'text-[26px]' : 'text-[28px] lg:text-[34px]'}`}>{headline}</p>
      <p className="text-base leading-[1.4] lg:text-[17px]">{description}</p>
    </div>
  );
}

export default function ResultCards({ items, columns = 2 }: { items: Result[]; columns?: 2 | 3 }) {
  return (
    <div className={`grid gap-4 ${columns === 3 ? 'md:grid-cols-3' : 'lg:grid-cols-2'}`}>
      {items.map((r) => (
        <ResultCard key={r.name} {...r} compact={columns === 3} />
      ))}
    </div>
  );
}