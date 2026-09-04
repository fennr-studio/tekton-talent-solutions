'use client';

import { useId, type ReactNode } from 'react';
import { cx } from '@/lib/utils';

type BaseProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
};

/* Square corners and a single baseline rule: the form is set like the rest of
   the page, not like a component library. */
const control =
  'w-full rounded-none border-0 border-b border-current/25 bg-transparent px-0 py-3 text-[1.0625rem] ' +
  'placeholder:text-current/35 focus:border-current focus:outline-none focus-visible:outline-none ' +
  'transition-colors duration-400 ease-tekton';

function Shell({
  label,
  id,
  error,
  hint,
  required,
  className,
  children,
}: BaseProps & { id: string; children: ReactNode }) {
  return (
    <div className={cx('group', className)}>
      <label htmlFor={id} className="eyebrow block text-current/55">
        {label}
        {required ? <span aria-hidden> *</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {hint && !error ? (
        <p className="mt-2 text-micro normal-case text-current/50">{hint}</p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-micro normal-case text-cobalt">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  type = 'text',
  placeholder,
  autoComplete,
  ...props
}: BaseProps & {
  type?: 'text' | 'email' | 'tel';
  placeholder?: string;
  autoComplete?: string;
}) {
  const id = useId();
  return (
    <Shell {...props} id={id}>
      <input
        id={id}
        name={props.name}
        type={type}
        required={props.required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={props.error ? `${id}-error` : undefined}
        className={control}
      />
    </Shell>
  );
}

export function SelectField({
  options,
  defaultValue,
  ...props
}: BaseProps & {
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  const id = useId();
  return (
    <Shell {...props} id={id}>
      <select
        id={id}
        name={props.name}
        required={props.required}
        defaultValue={defaultValue ?? options[0]?.value}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={props.error ? `${id}-error` : undefined}
        className={cx(control, 'appearance-none cursor-pointer')}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-paper text-ink">
            {option.label}
          </option>
        ))}
      </select>
    </Shell>
  );
}

export function TextAreaField({
  placeholder,
  rows = 4,
  ...props
}: BaseProps & { placeholder?: string; rows?: number }) {
  const id = useId();
  return (
    <Shell {...props} id={id}>
      <textarea
        id={id}
        name={props.name}
        rows={rows}
        required={props.required}
        placeholder={placeholder}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={props.error ? `${id}-error` : undefined}
        className={cx(control, 'resize-y')}
      />
    </Shell>
  );
}

export function FileField({
  accept,
  ...props
}: BaseProps & { accept?: string }) {
  const id = useId();
  return (
    <Shell {...props} id={id}>
      <input
        id={id}
        name={props.name}
        type="file"
        accept={accept}
        aria-invalid={props.error ? true : undefined}
        aria-describedby={props.error ? `${id}-error` : undefined}
        className={cx(
          control,
          'file:mr-4 file:cursor-pointer file:rounded-none file:border file:border-current/30',
          'file:bg-transparent file:px-4 file:py-1.5 file:text-micro file:uppercase file:text-current',
        )}
      />
    </Shell>
  );
}

/** Off-screen honeypot. Bots fill it, humans never see it. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="website-field">Leave this field empty</label>
      <input id="website-field" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function SubmitButton({ pending, children }: { pending: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={cx(
        'group inline-flex items-center gap-3 border border-current px-7 py-4',
        'text-label uppercase tracking-[0.08em] transition-colors duration-400 ease-tekton',
        'hover:bg-ink hover:text-paper disabled:cursor-wait disabled:opacity-55',
      )}
    >
      <span>{pending ? 'Sending…' : children}</span>
      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
        <path
          d="M9 1l4 4-4 4M13 5H0"
          stroke="currentColor"
          strokeWidth="1.4"
          className="transition-transform duration-400 ease-tekton group-hover:translate-x-1"
        />
      </svg>
    </button>
  );
}

export function FormStatus({
  status,
  message,
}: {
  status: 'idle' | 'success' | 'error';
  message: string;
}) {
  if (status === 'idle' || !message) return null;
  return (
    <p
      role="status"
      aria-live="polite"
      className={cx(
        'border-l-2 py-2 pl-4 text-label',
        status === 'success' ? 'border-citrus text-current' : 'border-cobalt text-current/85',
      )}
    >
      {message}
    </p>
  );
}
