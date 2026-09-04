'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { cx } from '@/lib/utils';

/** useLayoutEffect warns during SSR; on the server there is nothing to measure. */
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** Font size used only for measuring. The ratio it produces is what matters. */
const PROBE_PX = 100;

type FitTextProps = {
  children: ReactNode;
  className?: string;
  /** Fraction of the container width to fill. 1 = edge to edge. */
  fill?: number;
  /** Guard rails, in px, so a very narrow or very wide viewport stays sane. */
  min?: number;
  max?: number;
};

/**
 * Scales a single line of display type so it fills its container exactly.
 *
 * This is the mechanism behind headlines that sit flush to both edges at any
 * viewport — and it is also why this system cannot produce the clipped or
 * awkwardly wrapped headline that a fixed `vw` size eventually does: the size
 * is derived from the text and the box, so it is correct by construction.
 *
 * Measurement runs in a layout effect (before paint) and again once webfonts
 * have loaded, since condensed faces differ substantially from the fallback.
 */
export function FitText({ children, className, fill = 1, min = 12, max = 1200 }: FitTextProps) {
  const boxRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState<number | null>(null);

  const measure = useCallback(() => {
    const box = boxRef.current;
    const text = textRef.current;
    if (!box || !text) return;

    const available = box.clientWidth * fill;
    if (available <= 0) return;

    /* Measure at a known size, then scale. Reading the width at the probe size
       rather than the current size keeps this stable across re-runs.

       The measured element must be inline-block: on a block-level element
       `scrollWidth` reports the *container* width, not the width the text
       actually wants, so every ratio would come out as exactly 1 and the type
       would never leave the probe size. Shrink-to-fit plus a rect read is the
       only reliable way to ask "how wide does this string want to be". */
    const previous = text.style.fontSize;
    text.style.fontSize = `${PROBE_PX}px`;
    const natural = text.getBoundingClientRect().width;
    text.style.fontSize = previous;

    if (!natural) return;
    const next = Math.max(min, Math.min(max, (available / natural) * PROBE_PX));
    setSize((current) => (current !== null && Math.abs(current - next) < 0.5 ? current : next));
  }, [fill, min, max]);

  useIsoLayoutEffect(() => {
    measure();

    const box = boxRef.current;
    if (!box) return;

    const ro = new ResizeObserver(measure);
    ro.observe(box);

    /* The fallback face is much wider than condensed Archivo — without this the
       line would settle at the wrong size and stay there. */
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });

    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [measure, children]);

  return (
    /* Sub-1 leading is not decoration here: fitted lines are stacked directly
       on top of each other, and at this scale the default `normal` line-height
       opens a gap taller than a body paragraph between every line. Callers can
       still override it through `className`. */
    <span ref={boxRef} className={cx('block w-full leading-[0.78]', className)}>
      {/* inline-block, so the span shrink-wraps its text and can be measured.
          `align-top` keeps the inline box from adding a descender gap under
          the line. */}
      <span
        ref={textRef}
        className="inline-block whitespace-nowrap align-top"
        style={size ? { fontSize: `${size}px` } : undefined}
      >
        {children}
      </span>
    </span>
  );
}
