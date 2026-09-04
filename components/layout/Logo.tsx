import Link from 'next/link';
import { cx } from '@/lib/utils';

/**
 * Wordmark. The mark is two overlapping rings — the join between a client and
 * a candidate — drawn rather than imported so it inherits `currentColor` and
 * works on every ground the site uses.
 */
export function Logo({ className, label = true }: { className?: string; label?: boolean }) {
  return (
    <Link
      href="/"
      className={cx('group inline-flex items-center gap-2', className)}
      aria-label="Tekton Talent Solutions — home"
    >
      <svg width="26" height="16" viewBox="0 0 26 16" fill="none" aria-hidden className="shrink-0">
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" />
        <circle cx="18" cy="8" r="7" stroke="currentColor" strokeWidth="2" />
      </svg>
      {label ? (
        <span className="display text-[1.35rem] leading-none tracking-[-0.01em]">
          Tekton
        </span>
      ) : null}
    </Link>
  );
}
