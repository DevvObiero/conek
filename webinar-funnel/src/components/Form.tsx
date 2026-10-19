import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, CalendarDays, ChevronDown, Loader2, Lock } from 'lucide-react';
import { event as pixelEvent } from '../lib/pixel';
import { EVENT } from '../lib/event';
import { FORM_ID } from './SaveSeatButton';

export type LeadPayload = {
  first_name: string;
  email: string;
  phone: string;
  practice_type: string;
  monthly_revenue: string;
};

const WEBHOOK_URL: string = import.meta.env.VITE_WEBHOOK_URL || 'https://eo12345.m.pipedream.net';

const PRACTICE_TYPES = ['Chiropractic', 'PT', 'Integrated', 'Other'] as const;
const REVENUE_BANDS = ['Under $50K', '$50–100K', '$100–250K', '$250K+'] as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\-.\s\d]{7,20}$/;

const fieldClass = (hasError: boolean) =>
  `glass-field block w-full rounded-2xl px-4 py-3.5 text-[15px] text-white placeholder:text-white/30 transition-[border-color,background-color,box-shadow] focus:bg-white/[0.07] focus:outline-none focus:ring-4 ${
    hasError
      ? '!border-red-400/70 focus:ring-red-400/15'
      : 'hover:border-white/20 focus:border-white/45 focus:ring-white/10'
  }`;

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[13px] font-medium text-white/70">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function Form() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadPayload>({
    mode: 'onTouched',
    defaultValues: { first_name: '', email: '', phone: '', practice_type: '', monthly_revenue: '' },
  });

  const onSubmit = async (values: LeadPayload) => {
    const payload: LeadPayload = {
      first_name: values.first_name.trim(),
      email: values.email.trim().toLowerCase(),
      phone: values.phone.trim(),
      practice_type: values.practice_type,
      monthly_revenue: values.monthly_revenue,
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
      content_name: EVENT.shortTitle,
      practice_type: payload.practice_type,
      monthly_revenue: payload.monthly_revenue,
    });

    navigate('/confirmation', { state: { firstName: payload.first_name } });
  };

  const describedBy = (name: keyof LeadPayload) => (errors[name] ? `${name}-error` : undefined);

  return (
    <div
      id={FORM_ID}
      className="glass-strong scroll-mt-6 rounded-[2rem] p-6 sm:p-8"
    >
      <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white sm:text-[1.75rem]">
        Reserve your free seat
      </h2>
      <p className="mt-2 flex items-center gap-2 text-sm text-white/55">
        <CalendarDays className="h-4 w-4 text-white/70" aria-hidden="true" />
        {EVENT.dateLabel}, {EVENT.timeLabel}
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-4">
        <Field id="first_name" label="First name" error={errors.first_name?.message}>
          <input
            id="first_name"
            type="text"
            autoComplete="given-name"
            placeholder="Jordan"
            aria-invalid={!!errors.first_name}
            aria-describedby={describedBy('first_name')}
            className={fieldClass(!!errors.first_name)}
            {...register('first_name', {
              required: 'Enter your first name.',
              validate: (v) => v.trim().length > 0 || 'Enter your first name.',
            })}
          />
        </Field>

        <Field id="email" label="Email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@yourclinic.com"
            aria-invalid={!!errors.email}
            aria-describedby={describedBy('email')}
            className={fieldClass(!!errors.email)}
            {...register('email', {
              required: 'Enter your email address.',
              pattern: { value: EMAIL_PATTERN, message: 'Enter a valid email, like name@clinic.com.' },
            })}
          />
        </Field>

        <Field id="phone" label="Phone" error={errors.phone?.message}>
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
              required: 'Enter your phone number.',
              pattern: { value: PHONE_PATTERN, message: 'Enter a valid phone number.' },
              validate: (v) => v.replace(/\D/g, '').length >= 7 || 'Enter a valid phone number.',
            })}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <Field id="practice_type" label="Practice type" error={errors.practice_type?.message}>
            <div className="relative">
              <select
                id="practice_type"
                aria-invalid={!!errors.practice_type}
                aria-describedby={describedBy('practice_type')}
                className={`${fieldClass(!!errors.practice_type)} appearance-none pr-10`}
                {...register('practice_type', { required: 'Choose your practice type.' })}
              >
                <option value="" disabled>
                  Select one
                </option>
                {PRACTICE_TYPES.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
            </div>
          </Field>

          <Field id="monthly_revenue" label="Monthly revenue" error={errors.monthly_revenue?.message}>
            <div className="relative">
              <select
                id="monthly_revenue"
                aria-invalid={!!errors.monthly_revenue}
                aria-describedby={describedBy('monthly_revenue')}
                className={`${fieldClass(!!errors.monthly_revenue)} appearance-none pr-10`}
                {...register('monthly_revenue', { required: 'Choose your monthly revenue.' })}
              >
                <option value="" disabled>
                  Select one
                </option>
                {REVENUE_BANDS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
            </div>
          </Field>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-[15px] font-semibold transition-transform active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
              Saving your seat…
            </>
          ) : (
            'Save my seat'
          )}
        </button>

        <p className="flex items-start justify-center gap-1.5 text-center text-xs leading-relaxed text-white/40">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Free to attend. We'll only use your details to send the join link and reminders.
        </p>
      </form>
    </div>
  );
}
