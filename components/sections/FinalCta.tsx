'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FitText } from '@/components/animations/FitText';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Sticker } from '@/components/ui/Sticker';
import { site } from '@/data/site';
import { ease, inView } from '@/lib/motion';

const LINES = ['Got a team', 'to build?', "Let's talk."];

/**
 * The closing statement.
 *
 * Full viewport, three lines set edge to edge, and nothing else on screen but
 * the two ways to start a conversation. The lines drift apart slightly as the
 * section is scrolled through, which keeps the largest type on the site from
 * sitting completely static.
 */
export function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const shift = useTransform(scrollYProgress, [0, 1], ['6%', '0%']);

  return (
    <section
      id="contact"
      ref={ref}
      data-tone="dark"
      className="on-dark relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-ink py-[clamp(2.5rem,6vw,5rem)] text-paper"
    >
      <div className="edge">
        <ScrollReveal className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="eyebrow text-paper/50">Start here</p>
          <p className="text-label text-paper/50">
            Reply within one business day
            <Sticker tone="citrus" tilt={4} className="ml-3">
              Hyderabad
            </Sticker>
          </p>
        </ScrollReveal>
      </div>

      <div className="edge my-[clamp(2rem,5vw,4rem)]">
        <h2 aria-label="Got a team to build? Let's talk.">
          {LINES.map((line, i) => (
            <motion.span
              key={line}
              aria-hidden
              className="line-mask"
              style={reduced || i === 1 ? undefined : { x: i === 0 ? shift : undefined }}
              /* Trigger on the mask, animate the child. The child starts
                 translated clear of the mask, which zeroes its intersection
                 area — observing it directly would never fire. */
              initial="hidden"
              whileInView="visible"
              viewport={inView}
            >
              <motion.span
                className="block"
                variants={
                  reduced
                    ? undefined
                    : {
                        hidden: { y: '112%' },
                        visible: {
                          y: '0%',
                          transition: { duration: 1.1, ease, delay: i * 0.08 },
                        },
                      }
                }
              >
                <FitText className="display text-paper">{line}</FitText>
              </motion.span>
            </motion.span>
          ))}
        </h2>
      </div>

      <div className="edge">
        <div className="grid gap-8 border-t border-line-dark pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="eyebrow mb-2 text-paper/40">Hiring</p>
              <a
                href={`mailto:${site.email}`}
                className="display-wide text-d4 text-paper hover:text-citrus"
                data-cursor="open"
              >
                {site.email}
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2 text-paper/40">Call</p>
              <a
                href={`tel:${site.phoneHref}`}
                className="display-wide text-d4 text-paper hover:text-citrus"
                data-cursor="open"
              >
                {site.phone}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <MagneticButton
              href="/contact"
              className="bg-paper text-ink hover:bg-citrus"
              data-cursor="explore"
            >
              Brief us
            </MagneticButton>
            <MagneticButton href="/careers" variant="outline" data-cursor="explore">
              Send your CV
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
