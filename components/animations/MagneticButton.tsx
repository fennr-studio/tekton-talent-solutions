'use client';

import Link from 'next/link';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { useHasHover } from '@/hooks/useMediaQuery';
import { cx } from '@/lib/utils';

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'solid' | 'outline' | 'bare';
  className?: string;
  /** How far the element is allowed to follow the pointer, in px. */
  strength?: number;
  disabled?: boolean;
  'aria-label'?: string;
};

const SPRING = { stiffness: 260, damping: 22, mass: 0.6 };
/** Looser spring for the arrow, so it trails the shell instead of tracking it. */
const ARROW_SPRING = { stiffness: 170, damping: 20, mass: 0.6 };

const MotionLink = motion.create(Link);

/**
 * A control that leans toward the pointer, with the arrow travelling further
 * than the label so the movement has internal parallax.
 *
 * The effect is bound to `(hover: hover)` rather than a width breakpoint, so a
 * touch device never inherits a hover-only interaction it cannot undo.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'solid',
  className,
  strength = 14,
  disabled,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const hasHover = useHasHover();
  const active = hasHover && !reduced;

  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);
  /* Hooks must run unconditionally; whether the value is applied is decided in
     the style prop below, not by skipping the hook. */
  const arrowX = useSpring(x, ARROW_SPRING);

  const onMove = (event: React.MouseEvent) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    /* Normalised by half the box, so the pull is consistent at any size. */
    x.set((dx / (rect.width / 2)) * strength);
    y.set((dy / (rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const surface =
    variant === 'solid'
      ? 'bg-ink text-paper hover:bg-forest'
      : variant === 'outline'
        ? 'border border-current text-current hover:bg-ink hover:text-paper hover:border-ink'
        : 'text-current';

  const shell = cx(
    'group relative inline-flex items-center gap-3 px-7 py-4 text-label uppercase tracking-[0.08em]',
    'transition-colors duration-400 ease-tekton',
    variant !== 'bare' && surface,
    variant === 'bare' && 'px-0 py-0',
    disabled && 'pointer-events-none opacity-50',
    className,
  );

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden
        className="relative z-10 inline-block"
        /* The arrow trails the shell on a looser spring, which is what makes
           the gesture read as magnetic rather than as the whole button sliding. */
        style={active ? { x: arrowX } : undefined}
      >
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
          <path
            d="M9 1l4 4-4 4M13 5H0"
            stroke="currentColor"
            strokeWidth="1.4"
            className="transition-transform duration-400 ease-tekton group-hover:translate-x-1"
          />
        </svg>
      </motion.span>
    </>
  );

  const motionProps = active
    ? { style: { x, y }, onMouseMove: onMove, onMouseLeave: reset }
    : {};

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
    if (external) {
      return (
        <motion.a
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          className={shell}
          {...motionProps}
          {...rest}
        >
          {inner}
        </motion.a>
      );
    }
    return (
      <MotionLink
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={shell}
        {...motionProps}
        {...rest}
      >
        {inner}
      </MotionLink>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={shell}
      {...motionProps}
      {...rest}
    >
      {inner}
    </motion.button>
  );
}
