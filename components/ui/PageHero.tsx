'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { FitText } from '@/components/animations/FitText';
import { Sticker } from '@/components/ui/Sticker';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ease } from '@/lib/motion';

type PageHeroProps = {
  /** Small label above the headline. */
  marker: string;
  /** One entry per rendered line; each is fitted to the measure. */
  lines: string[];
  lede?: string;
  /** Optional annotation tag on the last line. */
  tag?: string;
  /** Fraction of the width each line fills, in order. Defaults to full. */
  fills?: number[];
};

/**
 * Interior page opening.
 *
 * Same mechanism as the homepage hero — lines fitted to the measure at
 * per-line fractions — so every route opens in the same voice without the
 * homepage's full-viewport commitment.
 */
export function PageHero({ marker, lines, lede, tag, fills }: PageHeroProps) {
  const reduced = useReducedMotion();
  /* Same reasoning as the homepage hero: the staggered fills are a wide-screen
     composition, so narrow viewports open the lines out towards full width. */
  const wide = useMediaQuery('(min-width: 768px)');

  return (
    <section data-tone="light" className="edge pb-[clamp(3rem,7vw,7rem)] pt-[clamp(7rem,13vw,12rem)]">
      <motion.p
        className="eyebrow mb-[3vw] text-ash"
        initial={reduced ? undefined : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        {marker}
      </motion.p>

      <h1 aria-label={lines.join(' ')}>
        {lines.map((line, i) => (
          <span key={line} aria-hidden className="line-mask flex">
            <motion.span
              className="block"
              style={{
                width: `${(wide ? (fills?.[i] ?? 1) : Math.max(fills?.[i] ?? 1, 0.9)) * 100}%`,
              }}
              initial={reduced ? undefined : { y: '112%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, ease, delay: 0.08 + i * 0.08 }}
            >
              <FitText className="display text-ink">
                {line}
                {tag && i === lines.length - 1 ? (
                  <Sticker tone="citrus" tilt={5} scaleWithText className="ml-[0.15em] align-super">
                    {tag}
                  </Sticker>
                ) : null}
              </FitText>
            </motion.span>
          </span>
        ))}
      </h1>

      {lede ? (
        <motion.p
          className="mt-[3vw] max-w-measure-wide text-lede text-ash"
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.35 }}
        >
          {lede}
        </motion.p>
      ) : null}
    </section>
  );
}
