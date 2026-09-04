import { cx } from '@/lib/utils';

type StickerProps = {
  children: string;
  /** Accent ground. These are the only places colour appears in the system. */
  tone?: 'citrus' | 'lilac' | 'peach' | 'paper';
  /** Rotation in degrees. Vary it between neighbouring stickers. */
  tilt?: number;
  /**
   * Size in `em` rather than at a fixed scale. Required whenever the sticker
   * sits inside a FitText line: that component derives a font size from the
   * measured width of its contents, so a child whose size does *not* scale with
   * the result makes the measurement wrong and the line overflows its box.
   */
  scaleWithText?: boolean;
  className?: string;
};

const TONE = {
  citrus: 'bg-citrus',
  lilac: 'bg-lilac',
  peach: 'bg-peach',
  paper: 'bg-paper',
} as const;

/**
 * A rotated annotation tag — the one piece of colour in the system, used to
 * label a display line the way a marker annotates a printed proof.
 *
 * Purely decorative: the text it tags always says the same thing in the
 * surrounding copy, so it is hidden from assistive tech rather than read out
 * as a floating fragment.
 */
export function Sticker({
  children,
  tone = 'citrus',
  tilt = -5,
  scaleWithText = false,
  className,
}: StickerProps) {
  return (
    <span
      aria-hidden
      className={cx(
        'sticker',
        scaleWithText ? 'text-[0.13em]' : 'text-[clamp(0.7rem,1.1vw,1.05rem)]',
        TONE[tone],
        className,
      )}
      style={{ '--tilt': `${tilt}deg` } as React.CSSProperties}
    >
      {children}
    </span>
  );
}
