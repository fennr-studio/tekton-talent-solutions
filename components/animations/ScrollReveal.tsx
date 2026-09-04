'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { ease, inView } from '@/lib/motion';

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance travelled, in px. Small by design — this is a supporting move. */
  y?: number;
  as?: 'div' | 'li' | 'section' | 'span';
};

/**
 * The quiet reveal: body copy, labels, small blocks. Display type uses
 * SplitTextReveal instead, so the two never compete for attention.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = 'div',
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.85, ease, delay }}
    >
      {children}
    </Component>
  );
}
