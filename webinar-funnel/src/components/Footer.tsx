import { LINKS } from '../lib/event';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-4 py-8 text-ink-3 sm:px-6">
        <p className="text-sm">
          © 2026 C.M. Conek Media Ltd. ·{' '}
          <a href={LINKS.privacy} className="underline-offset-2 hover:underline">
            Privacy Policy
          </a>{' '}
          ·{' '}
          <a href={LINKS.terms} className="underline-offset-2 hover:underline">
            Terms
          </a>
        </p>
        <p className="max-w-3xl text-xs leading-relaxed">
          Results shown are from individual clinics and are not typical or guaranteed. Results depend on your market,
          budget, offer and follow-up. This site is not part of, or endorsed by, Meta Platforms, Inc.
        </p>
      </div>
    </footer>
  );
}