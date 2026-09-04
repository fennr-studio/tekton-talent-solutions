'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { Sticker } from '@/components/ui/Sticker';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ease } from '@/lib/motion';
import { cx } from '@/lib/utils';

const STEPS = [
  {
    word: 'Source',
    tag: 'Network',
    body: 'A live PAN India network built and maintained continuously, so a requirement is met from people we already know rather than from a database refreshed after the fact.',
  },
  {
    word: 'Screen',
    tag: 'Panels',
    body: 'Every candidate is assessed by specialists who have worked in the domain they are screening for. Evidence of technical depth is attached to each profile before it reaches you.',
  },
  {
    word: 'Deliver',
    tag: 'CMMI 3',
    body: 'Scoping, shortlist, interview support, offer management and joining follow-through — run as one defined process, applied consistently across every engagement.',
  },
  {
    word: 'Support',
    tag: 'After',
    body: 'Technical and soft-skills coaching led in-house, continuing after the placement rather than stopping at the offer letter.',
  },
];

/**
 * The held word.
 *
 * "We" stays fixed in a colour panel on the left while the right column travels
 * through the four verbs, so the section reads as one continuous sentence being
 * completed four different ways — WE SOURCE, WE SCREEN, WE DELIVER, WE SUPPORT.
 *
 * The pin itself is CSS `position: sticky`, which cannot desynchronise from
 * Lenis the way a JS-driven pin can. ScrollTrigger is used for the thing it is
 * genuinely better at — reporting which step is active — rather than for
 * holding the element in place.
 */
export function ProcessPinned() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const steps = gsap.utils.toArray<HTMLElement>('[data-step]', root);

    /* One trigger per step. `toggleActions` is not enough here — we need the
       index on the way back up as well, so both callbacks set it. */
    const triggers = steps.map((step, i) =>
      ScrollTrigger.create({
        trigger: step,
        start: 'top 60%',
        end: 'bottom 60%',
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      }),
    );

    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  return (
    <section
      ref={ref}
      aria-label="How we work"
      data-tone="dark"
      className="on-dark relative w-full bg-ink text-paper"
    >
      <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        {/* Held panel. Sticky rather than pinned, and only on wide screens —
            on a phone a sticky colour block would eat most of the viewport. */}
        <div className="relative lg:sticky lg:top-0 lg:h-screen">
          <div className="flex h-full flex-col justify-between bg-forest px-gutter py-[clamp(2rem,5vw,4rem)] lg:py-[clamp(3rem,6vw,6rem)]">
            <p className="eyebrow text-paper/60">How we work</p>

            <p className="display text-[clamp(5rem,17vw,15rem)] leading-[0.8] text-paper">
              We
            </p>

            <ol className="flex gap-2 lg:flex-col lg:gap-0" aria-hidden>
              {STEPS.map((step, i) => (
                <li
                  key={step.word}
                  className="flex-1 border-t border-paper/25 pt-2 lg:border-t-0 lg:pt-0"
                >
                  <span
                    className={cx(
                      'block py-1 text-label transition-colors duration-400 ease-tekton',
                      i === active ? 'text-paper' : 'text-paper/35',
                    )}
                  >
                    <span className="numeral mr-2 text-micro">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="hidden lg:inline">{step.word}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Travelling column. */}
        <div>
          {STEPS.map((step, i) => (
            <div
              key={step.word}
              data-step
              className={cx(
                'flex min-h-[70vh] flex-col justify-center px-gutter py-[clamp(3rem,8vw,7rem)] lg:min-h-screen',
                i % 2 === 0 ? 'bg-ink' : 'bg-ink-soft',
              )}
            >
              <motion.div
                initial={reduced ? undefined : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.85, ease }}
              >
                <p className="display text-d1 text-paper">
                  {step.word}
                  <Sticker
                    tone={i % 2 === 0 ? 'citrus' : 'lilac'}
                    tilt={i % 2 === 0 ? -6 : 5}
                    className="ml-[0.2em] align-super"
                  >
                    {step.tag}
                  </Sticker>
                </p>
                <p className="measure mt-8 text-lede text-paper/70">{step.body}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <ScrollReveal className="edge border-t border-line-dark py-8">
        <p className="text-label text-paper/50">
          One process, applied the same way on every engagement — appraised at CMMI Level&nbsp;3 and
          governed by an ISO&nbsp;9001:2015 quality management system.
        </p>
      </ScrollReveal>
    </section>
  );
}
