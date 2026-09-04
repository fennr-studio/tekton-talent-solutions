'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { useState } from 'react';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { Section } from '@/components/ui/Section';
import { useHasHover } from '@/hooks/useMediaQuery';
import { homeServices } from '@/data/services';
import { photos } from '@/data/imagery';
import { ease } from '@/lib/motion';
import { cx } from '@/lib/utils';

/** One frame per service, in the order the services are listed. */
const SERVICE_PHOTOS = [photos.screening, photos.planning, photos.infrastructure, photos.team];

/**
 * Services as an index, not as cards.
 *
 * Each line is a full-width row of display type. Pointing at one dims its
 * siblings and floats the matching photograph alongside the cursor, so the
 * section is discovered rather than read — but the underlying markup is an
 * ordered list of links, so keyboard and touch users get the same content in
 * the same order without any of the hover machinery.
 */
export function ServicesEditorial() {
  const [active, setActive] = useState<number | null>(null);
  const hasHover = useHasHover();
  const reduced = useReducedMotion();
  const interactive = hasHover && !reduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 24, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 180, damping: 24, mass: 0.5 });

  const onMove = (event: React.MouseEvent) => {
    if (!interactive) return;
    x.set(event.clientX);
    y.set(event.clientY);
  };

  return (
    <Section id="services" tone="paper">
      <div className="edge" onMouseMove={onMove}>
        <ScrollReveal className="mb-[5vw] flex flex-wrap items-baseline justify-between gap-4">
          <p className="eyebrow text-ash">Services</p>
          <Link href="/services" className="text-label underline-offset-4 hover:underline">
            All six services
          </Link>
        </ScrollReveal>

        <SplitTextReveal
          as="h2"
          lines={['Four ways', 'enterprises', 'work with us.']}
          className="display mb-[6vw] text-d2"
        />

        <ol onMouseLeave={() => setActive(null)}>
          {homeServices.map((service, i) => (
            <li key={service.slug} className="border-t border-line last:border-b">
              <Link
                href={`/services#${service.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                data-cursor="view"
                className="group grid grid-cols-[auto_1fr] items-baseline gap-x-[clamp(1rem,3vw,4rem)] py-[clamp(1rem,2.2vw,2.25rem)]"
              >
                <span
                  className={cx(
                    'numeral text-[clamp(0.85rem,1.2vw,1.05rem)] transition-colors duration-400 ease-tekton',
                    active === i ? 'text-cobalt' : 'text-ghost',
                  )}
                >
                  {service.index}
                </span>

                <span className="min-w-0">
                  <span
                    className={cx(
                      'display block text-d2 transition-colors duration-400 ease-tekton',
                      active !== null && active !== i ? 'text-ghost' : 'text-ink',
                    )}
                  >
                    {service.name}
                  </span>
                  {/* The summary opens on hover on pointer devices, and is
                      simply always present everywhere else. */}
                  <span
                    className={cx(
                      'measure block overflow-hidden text-label text-ash',
                      interactive
                        ? 'max-h-0 opacity-0 transition-all duration-600 ease-tekton group-hover:mt-3 group-hover:max-h-24 group-hover:opacity-100 group-focus-visible:mt-3 group-focus-visible:max-h-24 group-focus-visible:opacity-100'
                        : 'mt-3',
                    )}
                  >
                    {service.summary}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* Floating preview. Fixed-position and pointer-events-none so it can
          never intercept the hover it is responding to. */}
      {interactive ? (
        <AnimatePresence>
          {active !== null ? (
            <motion.div
              key={active}
              className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[26vw] max-w-[380px] lg:block"
              style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={SERVICE_PHOTOS[active].src}
                  alt=""
                  fill
                  sizes="26vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </Section>
  );
}
