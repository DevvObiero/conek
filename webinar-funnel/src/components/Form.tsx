import type { ReactNode, SelectHTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ChevronDown, Loader2 } from 'lucide-react';
import { event as pixelEvent } from '../lib/pixel';
import { EVENT } from '../lib/event';
import { FORM_ID } from './SaveSeatButton';

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  practice_type: string;
  monthly_revenue: string;
  sms_consent: boolean;
};

export type LeadPayload = Omit<FormValues, 'phone'> & {
  /** E.164, e.g. +14155550123 */
  phone: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
};

/** One webhook (HighLevel inbound webhook, or n8n) that creates the contact and fans out. */
const WEBHOOK_URL: string = import.meta.env.VITE_WEBHOOK_URL || 'https://eo12345.m.pipedream.net';

const PRACTICE_TYPES = ['Chiropractic', 'Integrated / multi-specialty', 'Physical therapy', 'Regenerative medicine', 'Other'];
const REVENUE_BANDS = ['Under $10,000', '$10,000 - $20,000', '$20,000 - $50,000', '$50,000 - $100,000', '$100,000+'];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** US/Canada number: 10 digits (optional leading 1), area code and exchange can't start with 0 or 1. */
function toNanp(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  const n = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  return /^[2-9]\d{2}[2-9]\d{6}$/.test(n) ? n : null;
}

function readUtms() {
  const p = new URLSearchParams(window.location.search);
  const get = (k: string) => p.get(k) ?? '';
  return {
    utm_source: get('utm_source'),
    utm_medium: get('utm_medium'),
    utm_campaign: get('utm_campaign'),
    utm_content: get('utm_content'),
    utm_term: get('utm_term'),
  };
}

const fieldClass = (hasError: boolean) =>
  `glass-field block h-12 w-full rounded-lg px-3 text-base text-ink placeholder:text-muted transition-[border-color,box-shadow] focus:outline-none focus:ring-4 ${
    hasError ? '!border-danger focus:ring-danger/15' : 'focus:!border-accent focus:ring-accent/15'
  }`;

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-[13px] font-medium text-danger">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

function Select({ id, options, placeholder, error, ...rest }: { id: string; options: string[]; placeholder: string; error: boolean } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select id={id} className={`${fieldClass(error)} appearance-none pr-10`} {...rest}>
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" aria-hidden="true" />
    </div>
  );
}

export default function Form() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      practice_type: '',
      monthly_revenue: '',
      sms_consent: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    const payload: LeadPayload = {
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
      email: values.email.trim().toLowerCase(),
      phone: `+1${toNanp(values.phone)}`,
      practice_type: values.practice_type,
      monthly_revenue: values.monthly_revenue,
      sms_consent: values.sms_consent,
      ...readUtms(),
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      if (!res.ok) console.warn(`[lead] webhook responded ${res.status}`);
    } catch (err) {
      // Don't strand a registrant on a webhook outage; log and continue.
      console.error('[lead] webhook request failed', err);
    }

    pixelEvent('Lead', {
      content_name: EVENT.title,
      practice_type: payload.practice_type,
      monthly_revenue: payload.monthly_revenue,
    });

    navigate('/confirmation', { state: { firstName: payload.first_name } });
  };

  const describedBy = (name: keyof FormValues) => (errors[name] ? `${name}-error` : undefined);

  return (
    <div id={FORM_ID} className="glass scroll-mt-4 overflow-hidden rounded-[14px]">
      <div className="glass-navy !rounded-none !border-0 px-[22px] py-3.5 text-center text-base font-bold !shadow-none">
        {EVENT.shortDate} · {EVENT.time}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-3.5 p-5 sm:p-[22px]">
        <h2 className="font-display text-[28px] font-extrabold leading-[1.1]">Save Your Seat. It's Free.</h2>
        <p className="text-base text-ink-2">Live. No replay. When the room is full, it's full.</p>

        <div className="flex gap-2.5">
          <Field id="first_name" label="First name" error={errors.first_name?.message}>
            <input
              id="first_name"
              type="text"
              autoComplete="given-name"
              aria-invalid={!!errors.first_name}
              aria-describedby={describedBy('first_name')}
              className={fieldClass(!!errors.first_name)}
              {...register('first_name', {
                validate: (v) => v.trim().length > 0 || 'Enter your first name.',
              })}
            />
          </Field>
          <Field id="last_name" label="Last name" error={errors.last_name?.message}>
            <input
              id="last_name"
              type="text"
              autoComplete="family-name"
              aria-invalid={!!errors.last_name}
              aria-describedby={describedBy('last_name')}
              className={fieldClass(!!errors.last_name)}
              {...register('last_name', {
                validate: (v) => v.trim().length > 0 || 'Enter your last name.',
              })}
            />
          </Field>
        </div>

        <Field id="email" label="Email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy('email')}
            className={fieldClass(!!errors.email)}
            {...register('email', {
              required: 'Enter your email address.',
              pattern: { value: EMAIL_PATTERN, message: 'Enter a valid email, like name@clinic.com.' },
            })}
          />
        </Field>

        <Field id="phone" label="Mobile phone" error={errors.phone?.message}>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="(555) 123-4567"
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy('phone')}
            className={fieldClass(!!errors.phone)}
            {...register('phone', {
              required: 'Enter your mobile number.',
              validate: (v) => toNanp(v) !== null || 'Enter a valid 10-digit US or Canadian mobile number.',
            })}
          />
        </Field>

        <Field id="practice_type" label="Practice type" error={errors.practice_type?.message}>
          <Select
            id="practice_type"
            options={PRACTICE_TYPES}
            placeholder="Select your practice type"
            error={!!errors.practice_type}
            aria-invalid={!!errors.practice_type}
            aria-describedby={describedBy('practice_type')}
            {...register('practice_type', { required: 'Choose your practice type.' })}
          />
        </Field>

        <Field id="monthly_revenue" label="Current monthly revenue" error={errors.monthly_revenue?.message}>
          <Select
            id="monthly_revenue"
            options={REVENUE_BANDS}
            placeholder="Select your monthly revenue"
            error={!!errors.monthly_revenue}
            aria-invalid={!!errors.monthly_revenue}
            aria-describedby={describedBy('monthly_revenue')}
            {...register('monthly_revenue', { required: 'Choose your monthly revenue.' })}
          />
        </Field>

        <div className="flex items-start gap-2.5">
          <input
            id="sms_consent"
            type="checkbox"
            className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--accent)]"
            {...register('sms_consent')}
          />
          <label htmlFor="sms_consent" className="text-[13px] leading-[1.4] text-ink-3">
            Send me workshop reminders by text and email. Message and data rates may apply. Reply STOP to opt out.
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-glass inline-flex h-[58px] items-center justify-center gap-2 rounded-full font-display text-xl font-extrabold disabled:cursor-wait disabled:opacity-80"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Saving your seat…
            </>
          ) : (
            'Save My Seat'
          )}
        </button>
        <p className="text-center text-sm text-ink-3">Free. No card needed.</p>
      </form>
    </div>
  );
}