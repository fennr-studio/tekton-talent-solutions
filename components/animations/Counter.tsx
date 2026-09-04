'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/utils';

type CounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
};

/**
 * Counts once, when it first enters view.
 *
 * The final value is rendered on the server and remains the element's text at
 * every moment — the animation only overwrites it once running — so the number
 * is correct for crawlers, for reduced-motion visitors, and if JS never loads.
 */
export function Counter({ value, prefix = '', suffix = '', className, duration = 1.9 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduced) return;
    setDisplay(0);
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className={cx('numeral tabular-nums', className)}>
      {prefix}
      {display.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}
