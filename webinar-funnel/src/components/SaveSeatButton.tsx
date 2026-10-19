import { ArrowDown } from 'lucide-react';

export const FORM_ID = 'register';

/** Smooth-scrolls to the registration form and focuses its first field. */
export function scrollToForm() {
  const target = document.getElementById(FORM_ID);
  if (!target) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  const firstField = target.querySelector<HTMLInputElement>('input, select');
  window.setTimeout(() => firstField?.focus({ preventScroll: true }), reduceMotion ? 0 : 600);
}

type Props = {
  label?: string;
  className?: string;
  /** Hide on desktop, where the sticky form is always visible. */
  mobileOnly?: boolean;
};

export default function SaveSeatButton({ label = 'Save my seat', className = '', mobileOnly = false }: Props) {
  return (
    <a
      href={`#${FORM_ID}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToForm();
      }}
      className={`btn-primary group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold transition-transform active:scale-[0.98] ${
        mobileOnly ? 'lg:hidden' : ''
      } ${className}`}
    >
      {label}
      <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
    </a>
  );
}