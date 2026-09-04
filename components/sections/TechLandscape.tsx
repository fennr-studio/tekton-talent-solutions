'use client';

import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { Section } from '@/components/ui/Section';
import { useHasHover } from '@/hooks/useMediaQuery';
import { technologyDomains } from '@/data/technology-domains';
import { cx } from '@/lib/utils';

/**
 * The technology landscape.
 *
 * Six domains at display scale, each drifting horizontally at its own rate as
 * the section passes — so the block behaves like a landscape you move through
 * rather than a list you read. Pointing at a name holds it still, brings it to
 * full contrast and opens its capabilities underneath.
 */
export function TechLandscape() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const hasHover = useHasHover();
  const interactive = hasHover && !reduced;
  const [active, setActive] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  /* Two speeds, alternated by row. Small numbers — this is texture, not travel. */
  const slow = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  const fast = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <Section id="expertise" tone="forest" className="overflow-hidden">
      <div ref={ref} className="edge">
        <ScrollReveal className="mb-[5vw] flex flex-wrap items-baseline justify-between gap-4">
          <p className="eyebrow text-paper/50">Expertise</p>
          <Link
            href="/expertise"
            className="text-label text-paper/70 underline-offset-4 hover:text-paper hover:underline"
          >
            Every domain
          </Link>
        </ScrollReveal>

        <SplitTextReveal
          as="h2"
          lines={['Where our network', 'runs deepest.']}
          className="display mb-[6vw] text-d3 text-paper"
        />

        <ul onMouseLeave={() => setActive(null)}>
          {technologyDomains.map((domain, i) => (
            <li key={domain.slug} className="border-t border-line-dark last:border-b">
              <motion.div style={reduced || active === i ? undefined : { x: i % 2 ? fast : slow }}>
                <Link
                  href={`/expertise#${domain.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  data-cursor="explore"
                  className="group block py-[clamp(0.75rem,1.6vw,1.75rem)]"
                >
                  <span className="flex flex-wrap items-baseline gap-x-[0.4em] gap-y-1">
                    <span
                      className={cx(
                        'display text-d2 transition-colors duration-400 ease-tekton',
                        active !== null && active !== i ? 'text-paper/30' : 'text-paper',
                      )}
                    >
                      {domain.name}
                    </span>
                    <span className="eyebrow text-citrus">{domain.category}</span>
                  </span>

                  <span
                    className={cx(
                      'block overflow-hidden text-paper/70',
                      interactive
                        ? 'max-h-0 opacity-0 transition-all duration-600 ease-tekton group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100 group-focus-visible:mt-3 group-focus-visible:max-h-40 group-focus-visible:opacity-100'
                        : 'mt-3',
                    )}
                  >
                    <span className="measure block text-label">{domain.summary}</span>
                    <span className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-micro uppercase text-paper/45">
                      {domain.capabilities.map((capability) => (
                        <span key={capability}>{capability}</span>
                      ))}
                    </span>
                  </span>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
