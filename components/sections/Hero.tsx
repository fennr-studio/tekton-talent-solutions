'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FitText } from '@/components/animations/FitText';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { MarqueeText } from '@/components/animations/MarqueeText';
import { Sticker } from '@/components/ui/Sticker';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ease } from '@/lib/motion';
import { site } from '@/data/site';

/**
 * The headline, composed rather than merely wrapped.
 *
 * Each line declares how much of the measure it should occupy; FitText derives
 * the type size from that fraction and the actual glyph widths. The result is a
 * deliberately uneven column — the shape is the design — and, because the size
 * is computed from the text, a line can never overflow or wrap unexpectedly at
 * a viewport nobody tested.
 */
const LINES = [
  { text: 'Empowering', fill: 0.58, fillSm: 0.94, align: 'start' as const },
  { text: 'enterprise', fill: 0.92, fillSm: 1, align: 'start' as const },
  { text: 'growth', fill: 0.54, fillSm: 0.74, align: 'end' as const },
  { text: "with India's", fill: 0.5, fillSm: 0.88, align: 'start' as const },
  { text: 'tech advantage', fill: 0.78, fillSm: 1, align: 'end' as const },
];

const MARQUEE = [
  'IT services',
  'IT recruitment',
  'FTE',
  'C2H',
  'C2C',
  'RPO',
  'Contract staffing',
  'Technical training',
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  /* The staggered fills are a wide-screen composition. On a phone the same
     fractions just leave a column of dead space down the right-hand side, so
     the lines open out towards full width instead. Mobile-first: the hook
     returns false during SSR and the first client render, which is the
     narrow case. */
  const wide = useMediaQuery('(min-width: 768px)');

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  /* The headline leaves faster than the page scrolls, so the hero feels like a
     layer being lifted away rather than a block sliding off. */
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-32%']);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="welcome"
      ref={ref}
      data-tone="light"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      <div className="edge flex min-h-[100svh] flex-col pb-8 pt-28">
        <motion.div
          className="flex flex-1 flex-col justify-center"
          style={reduced ? undefined : { y, opacity }}
        >
          <motion.p
            className="eyebrow mb-[3vw] text-ash"
            initial={reduced ? undefined : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
          >
            {site.city} · {site.coverage}
          </motion.p>

          <h1 aria-label="Empowering enterprise growth with India's tech advantage">
            {LINES.map((line, i) => (
              <span
                key={line.text}
                aria-hidden
                className={`line-mask flex ${
                  line.align === 'end' ? 'justify-end' : 'justify-start'
                }`}
              >
                <motion.span
                  className="block"
                  style={{ width: `${(wide ? line.fill : line.fillSm) * 100}%` }}
                  initial={reduced ? undefined : { y: '112%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.15, ease, delay: 0.12 + i * 0.085 }}
                >
                  <FitText className="display text-ink">
                    {line.text}
                    {/* The tag rides with its line rather than floating over
                        the composition, so it survives any reflow. */}
                    {i === 2 ? (
                      <Sticker tone="lilac" tilt={-7} scaleWithText className="ml-[0.15em] align-super">
                        PAN India
                      </Sticker>
                    ) : null}
                    {i === 4 ? (
                      <Sticker tone="citrus" tilt={5} scaleWithText className="ml-[0.15em] align-super">
                        Since 2021
                      </Sticker>
                    ) : null}
                  </FitText>
                </motion.span>
              </span>
            ))}
          </h1>
        </motion.div>

        <motion.div
          className="mt-[4vw] grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"
          initial={reduced ? undefined : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.72 }}
        >
          <p className="measure text-lede text-ash">
            India&rsquo;s strategic partner for CMMI Level&nbsp;3 certified IT recruitment and
            turnkey technology consulting, delivering excellence since {site.founded}.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton href="/contact" data-cursor="explore">
              Build your team
            </MagneticButton>
            <MagneticButton href="/services" variant="outline" data-cursor="explore">
              Explore services
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 flex items-center gap-6 border-t border-line pt-5"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.9 }}
        >
          <a
            href="#impact"
            className="eyebrow flex shrink-0 items-center gap-3 text-ash hover:text-ink"
            data-cursor="scroll"
          >
            <span
              aria-hidden
              className="relative block h-8 w-px overflow-hidden bg-line"
            >
              <span className="absolute inset-x-0 top-0 block h-1/2 animate-scroll-hint bg-ink motion-reduce:animate-none" />
            </span>
            Scroll
          </a>
          <MarqueeText
            items={MARQUEE}
            className="display text-[clamp(0.9rem,1.5vw,1.25rem)] text-ash"
            duration={46}
          />
        </motion.div>
      </div>
    </section>
  );
}
