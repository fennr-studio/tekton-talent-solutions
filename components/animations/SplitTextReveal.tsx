'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { createElement, type ElementType } from 'react';
import { ease, inView, LINE_TRAVEL } from '@/lib/motion';
import { cx } from '@/lib/utils';

type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';

type SplitTextRevealProps = {
  /** One entry per rendered line. Line breaks are a design decision, not a
   *  consequence of wrapping, so they are always authored explicitly. */
  lines: string[];
  as?: Tag;
  /** `line` slides each whole line up; `word` staggers the words within it. */
  split?: 'line' | 'word';
  className?: string;
  lineClassName?: string;
  /** Play on mount rather than on scroll — used by the hero. */
  immediate?: boolean;
  delay?: number;
  /** Seconds between successive lines (or words). */
  stagger?: number;
  duration?: number;
};

/**
 * Display type that rises out of a mask.
 *
 * The animated pieces are marked `aria-hidden` and the full string is exposed
 * once via `aria-label` on the container, so assistive tech reads one clean
 * sentence rather than a stream of fragments — and the text is still real text
 * in the DOM for crawlers.
 *
 * With reduced motion the component renders the same markup with no transform,
 * so layout is identical and nothing shifts.
 */
export function SplitTextReveal({
  lines,
  as = 'h2',
  split = 'line',
  className,
  lineClassName,
  immediate = false,
  delay = 0,
  stagger = 0.075,
  duration = 1.05,
}: SplitTextRevealProps) {
  const reduced = useReducedMotion();
  const label = lines.join(' ');

  if (reduced) {
    return createElement(
      as as ElementType,
      { className },
      lines.map((line, i) => (
        <span key={i} className={cx('block', lineClassName)}>
          {line}
        </span>
      )),
    );
  }

  const activation = immediate
    ? { animate: 'visible' as const }
    : { whileInView: 'visible' as const, viewport: inView };

  /* Word index has to run across the whole block, not restart per line, or the
     stagger visibly resets at every line break. */
  let wordIndex = -1;

  return (
    <motion.div initial="hidden" {...activation} className={className} aria-label={label}>
      {createElement(
        as as ElementType,
        { className: 'contents', 'aria-hidden': true },
        lines.map((line, i) => (
          <span key={i} className={cx('line-mask', lineClassName)}>
            {split === 'line' ? (
              <motion.span
                className="block"
                variants={{
                  hidden: { y: LINE_TRAVEL },
                  visible: { y: '0%', transition: { duration, ease, delay: delay + i * stagger } },
                }}
              >
                {line}
              </motion.span>
            ) : (
              <span className="block">
                {line.split(' ').map((word) => {
                  wordIndex += 1;
                  const at = wordIndex;
                  return (
                    <span key={at} className="line-mask inline-block align-top">
                      <motion.span
                        className="inline-block"
                        variants={{
                          hidden: { y: LINE_TRAVEL },
                          visible: {
                            y: '0%',
                            transition: { duration, ease, delay: delay + at * stagger },
                          },
                        }}
                      >
                        {word}
                        {/* A real space, kept inside the animated span so word
                            spacing never collapses. */}
                        <span className="inline-block w-[0.22em]" />
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            )}
          </span>
        )),
      )}
    </motion.div>
  );
}
