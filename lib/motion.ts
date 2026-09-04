import type { Transition, Variants } from 'framer-motion';

/**
 * One easing curve carries the whole site, so every reveal, hover and overlay
 * feels like the same hand. Typed as a fixed tuple to satisfy framer-motion's
 * cubic-bezier signature.
 */
export const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** A shorter, flatter curve for interface response (hovers, buttons, menu). */
export const easeSwift: [number, number, number, number] = [0.4, 0, 0.1, 1];

/** CSS string form, for GSAP and raw transitions. */
export const easeCss = 'cubic-bezier(0.16, 1, 0.3, 1)';
/** GSAP's own name for the same shape. */
export const gsapEase = 'expo.out';

export const baseTransition: Transition = { duration: 0.9, ease };

/** How far a masked line travels before it settles. Slightly over 100% so the
 *  ascenders are fully hidden at rest even with a padded mask. */
export const LINE_TRAVEL = '110%';

/**
 * Masked-line reveal. Applied to the inner span; the parent supplies the mask.
 * `custom` is the line's index, used to stagger a block of lines.
 */
export const lineVariants: Variants = {
  hidden: { y: LINE_TRAVEL },
  visible: (i: number = 0) => ({
    y: '0%',
    transition: { duration: 1.05, ease, delay: i * 0.075 },
  }),
};

/** Word-level reveal, for hero lines that animate a word at a time. */
export const wordVariants: Variants = {
  hidden: { y: LINE_TRAVEL, opacity: 1 },
  visible: (i: number = 0) => ({
    y: '0%',
    transition: { duration: 1.1, ease, delay: i * 0.06 },
  }),
};

/** Quiet fade-and-rise for body copy and small blocks. */
export const riseVariants: Variants = {
  hidden: { y: 22, opacity: 0 },
  visible: (i: number = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.85, ease, delay: i * 0.07 },
  }),
};

/** Clip-path image reveal — the image is uncovered rather than faded in. */
export const clipVariants: Variants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.15, ease },
  },
};

/** Standard in-view trigger. Once, and early enough to feel anticipatory. */
export const inView = { once: true, amount: 0.25 } as const;
