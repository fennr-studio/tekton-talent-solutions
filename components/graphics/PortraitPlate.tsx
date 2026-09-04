import Image from 'next/image';
import { cx } from '@/lib/utils';
import type { Leader } from '@/types';

/**
 * A leader's portrait.
 *
 * When Tekton supplies a photograph, `portrait` is set in `data/leadership.ts`
 * and this renders it. Until then it draws a monogram plate instead — the
 * previous site's portraits are hosted on Wix with unclear licensing, and a
 * stock photograph of an unrelated person standing in for a named executive
 * would be a misrepresentation, not a placeholder. See public/images/README.md.
 */
export function PortraitPlate({
  leader,
  className,
  sizes = '(max-width: 1024px) 100vw, 45vw',
  priority = false,
}: {
  leader: Leader;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (leader.portrait) {
    return (
      <div className={cx('relative overflow-hidden bg-mist', className)}>
        <Image
          src={leader.portrait}
          alt={`${leader.name}, ${leader.role} at Tekton Talent Solutions`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover grayscale transition-[filter,transform] duration-600 ease-tekton group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      </div>
    );
  }

  return (
    <div
      className={cx(
        'relative overflow-hidden bg-forest text-paper transition-colors duration-600 ease-tekton group-hover:bg-ink',
        className,
      )}
      /* Decorative: the name and role are set as real text beside the plate. */
      aria-hidden
    >
      {/* Hairline field, so the plate reads as a drawn object rather than a
          flat colour swatch waiting for an image. */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.18]" aria-hidden>
        <defs>
          <pattern id={`plate-${leader.slug}`} width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M44 0H0v44" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#plate-${leader.slug})`} />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="display text-[clamp(4rem,13vw,11rem)] leading-none">
          {leader.monogram}
        </span>
      </div>

      <span className="absolute bottom-4 left-4 text-micro uppercase tracking-[0.08em] text-paper/50">
        Portrait to follow
      </span>
    </div>
  );
}
