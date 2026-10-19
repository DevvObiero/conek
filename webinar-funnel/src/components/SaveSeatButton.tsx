export const FORM_ID = 'register';
const FIRST_FIELD_ID = 'first_name';

/** Briefly pulses the form so the eye goes to it. */
function flashForm(form: HTMLElement) {
  form.classList.remove('form-flash');
  void form.offsetWidth; // restart the animation
  form.classList.add('form-flash');
  window.setTimeout(() => form.classList.remove('form-flash'), 2400);
}

/**
 * Desktop (form pinned on screen): focus First name and pulse the form, no scrolling.
 * Phone: smooth-scroll to the form, then focus First name and pulse it.
 */
export function goToForm() {
  const form = document.getElementById(FORM_ID);
  if (!form) return;
  const first = document.getElementById(FIRST_FIELD_ID) as HTMLInputElement | null;
  const desktop = window.matchMedia('(min-width: 1024px)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (desktop) {
    first?.focus({ preventScroll: true });
    flashForm(form);
    return;
  }

  form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  window.setTimeout(
    () => {
      first?.focus({ preventScroll: true });
      flashForm(form);
    },
    reduceMotion ? 0 : 650,
  );
}

type Props = {
  label?: string;
  className?: string;
  /** Phone only (hidden from 1024px up, where the form is pinned). */
  mobileOnly?: boolean;
};

export default function SaveSeatButton({ label = 'Save My Seat', className = '', mobileOnly = false }: Props) {
  return (
    <a
      href={`#${FORM_ID}`}
      onClick={(e) => {
        e.preventDefault();
        goToForm();
      }}
      className={`btn-glass inline-flex items-center justify-center rounded-full px-[34px] py-[17px] text-center font-display text-xl font-extrabold no-underline ${
        mobileOnly ? 'lg:hidden' : ''
      } ${className}`}
    >
      {label}
    </a>
  );
}