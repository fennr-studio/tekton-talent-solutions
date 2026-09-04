import { cx } from '@/lib/utils';

type MarqueeTextProps = {
  items: string[];
  className?: string;
  /** Seconds for one full pass. Larger is slower. */
  duration?: number;
  separator?: string;
  reverse?: boolean;
};

/**
 * A continuous ticker, done in CSS.
 *
 * The track holds the list twice and translates by exactly -50%, so the loop is
 * seamless with no measurement, no per-frame JS and no client component — it
 * renders on the server and never re-renders. `prefers-reduced-motion` stops it
 * through the global rule in globals.css.
 */
export function MarqueeText({
  items,
  className,
  duration = 38,
  separator = '—',
  reverse = false,
}: MarqueeTextProps) {
  const run = [...items, ...items];

  return (
    <div
      className={cx('relative w-full overflow-hidden', className)}
      /* One ticker is decorative repetition of copy that exists elsewhere. */
      aria-hidden
    >
      <div
        className="flex w-max animate-marquee-x items-center"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {run.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="px-[0.25em]">{item}</span>
            <span className="px-[0.25em] opacity-40">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
