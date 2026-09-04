'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Counter } from '@/components/animations/Counter';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Section } from '@/components/ui/Section';
import { impactStats } from '@/data/stats';
import { ease, inView } from '@/lib/motion';

/**
 * The numbers, set as display type rather than in tiles.
 *
 * Each row slides laterally as it passes — alternating direction, and driven by
 * the section's own scroll progress — so the band reads as a moving ledger
 * instead of a static grid. Rules between rows are the only structure.
 */
export function ImpactStats() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const driftLeft = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);
  const driftRight = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <Section id="impact" tone="ink">
      <div ref={ref} className="edge">
        <ScrollReveal className="mb-[5vw] flex items-baseline justify-between gap-6">
          <p className="eyebrow text-paper/50">Impact</p>
          <p className="measure text-label text-paper/50">
            Figures as published by Tekton. Nothing here is estimated.
          </p>
        </ScrollReveal>

        <ul>
          {impactStats.map((stat, i) => (
            <motion.li
              key={stat.label}
              className="border-t border-line-dark last:border-b"
              style={reduced ? undefined : { x: i % 2 === 0 ? driftLeft : driftRight }}
              /* The row is the trigger, not the masked span inside it. A span
                 translated fully outside its `overflow-hidden` mask has an
                 intersection area of zero, so a threshold on that span can
                 never be met and the numeral would never arrive. */
              initial="hidden"
              whileInView="visible"
              viewport={inView}
            >
              <div className="grid items-baseline gap-x-8 gap-y-2 py-[clamp(1.25rem,2.6vw,2.75rem)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                <span className="line-mask">
                  <motion.span
                    className="block"
                    variants={
                      reduced
                        ? undefined
                        : {
                            hidden: { y: '110%' },
                            visible: {
                              y: '0%',
                              transition: { duration: 1, ease, delay: i * 0.05 },
                            },
                          }
                    }
                  >
                    {stat.value !== undefined ? (
                      <Counter
                        value={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        className="block text-d1 text-paper"
                      />
                    ) : (
                      /* A step down from the numerals. "PAN India" is four
                         times the width of "500" at the same size and would
                         wrap mid-phrase in this column; the numbers are what
                         earn the largest setting anyway. */
                      <span className="numeral block text-d2 text-paper">{stat.display}</span>
                    )}
                  </motion.span>
                </span>

                <div className="pb-[0.6vw]">
                  <p className="display-wide text-d4 text-paper">{stat.label}</p>
                  {stat.note ? (
                    <p className="measure mt-2 text-label text-paper/55">{stat.note}</p>
                  ) : null}
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
