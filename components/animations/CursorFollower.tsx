'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useHasHover } from '@/hooks/useMediaQuery';

/** Elements opt in with `data-cursor="view"` etc. */
type CursorState = 'default' | 'view' | 'explore' | 'open' | 'scroll' | 'play';

const LABEL: Record<CursorState, string> = {
  default: '',
  view: 'View',
  explore: 'Explore',
  open: 'Open',
  scroll: 'Scroll',
  play: 'Play',
};

const SIZE: Record<CursorState, number> = {
  default: 12,
  view: 84,
  explore: 92,
  open: 84,
  scroll: 84,
  play: 84,
};

/**
 * A cursor that reports what the thing under it will do.
 *
 * Mounted only where hover genuinely exists, so touch devices never pay for it
 * — neither the listeners nor the bundle work. State is read from a
 * `data-cursor` attribute on the hovered element, which keeps every call site
 * declarative and means no component has to import the cursor to use it.
 */
export function CursorFollower() {
  const hasHover = useHasHover();
  const reduced = useReducedMotion();
  const enabled = hasHover && !reduced;

  const [state, setState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 50, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 900, damping: 50, mass: 0.35 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      if (!visible) setVisible(true);

      const target = event.target as Element | null;
      const owner = target?.closest?.('[data-cursor]') as HTMLElement | null;
      const next = (owner?.dataset.cursor as CursorState) ?? 'default';
      setState((current) => (current === next ? current : next));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  const size = SIZE[state];
  const label = LABEL[state];

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-cursor mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full bg-paper"
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          x: -size / 2,
          y: -size / 2,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {label ? (
          <motion.span
            key={label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="eyebrow text-ink"
          >
            {label}
          </motion.span>
        ) : null}
      </motion.div>
    </motion.div>
  );
}
