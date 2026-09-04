'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { ease } from '@/lib/motion';

/**
 * Page transition.
 *
 * `template.tsx` remounts on every navigation, which is exactly the hook a
 * route transition needs — and unlike an AnimatePresence wrapper it does not
 * have to keep the outgoing page mounted, so there is no risk of two documents
 * fighting over scroll position mid-transition.
 *
 * Deliberately brief. A long transition on a content site is a tax the visitor
 * pays on every click.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease }}
    >
      {children}
    </motion.div>
  );
}
