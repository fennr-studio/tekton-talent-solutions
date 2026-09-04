'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from 'react';
import { ease } from '@/lib/motion';

const WORDS = ['Talent', 'Technology', 'Growth', 'India'];
const STEP_MS = 230;
const HOLD_MS = 260;
const SESSION_KEY = 'tekton:intro';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** True once the hero is allowed to play. */
const IntroReadyContext = createContext(true);
export const useIntroReady = () => useContext(IntroReadyContext);

/**
 * The opening sequence.
 *
 * Deliberately *not* driven by an inline script that stamps an attribute onto
 * `<html>` before hydration: doing that makes the client's first render differ
 * from the server's and React reports a hydration mismatch. Instead the overlay
 * is part of the tree and always rendered on the server, and the decision to
 * skip it for a repeat visit happens in a layout effect — before paint, so
 * there is still no flash, but after hydration, so the markup always agrees.
 */
export function IntroProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  /* Matches the server on first render; corrected before paint below. */
  const [phase, setPhase] = useState<'pending' | 'running' | 'done'>('pending');
  const [step, setStep] = useState(0);
  /* Distinguishes "finished playing" from "never should have played". The
     second must not animate out, or a repeat visitor watches a curtain lift
     off a page they already arrived at. */
  const [skipped, setSkipped] = useState(false);

  useIsoLayoutEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      /* Private mode or blocked storage — the intro simply plays again. */
    }
    if (seen || reduced) {
      setSkipped(true);
      setPhase('done');
    } else {
      setPhase('running');
    }
  }, [reduced]);

  useEffect(() => {
    if (phase !== 'running') return;

    const timers = WORDS.map((_, i) =>
      window.setTimeout(() => setStep(i), i * STEP_MS),
    );
    timers.push(
      window.setTimeout(() => {
        setPhase('done');
        try {
          sessionStorage.setItem(SESSION_KEY, '1');
        } catch {
          /* Non-fatal. */
        }
      }, WORDS.length * STEP_MS + HOLD_MS),
    );

    return () => timers.forEach(window.clearTimeout);
  }, [phase]);

  /* Hold the scroll position while the curtain is up. Done from JS rather than
     an SSR attribute, for the same hydration reason as above. */
  useEffect(() => {
    if (phase === 'done') return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [phase]);

  return (
    <IntroReadyContext.Provider value={phase === 'done'}>
      {/* AnimatePresence is bypassed entirely when the intro is skipped: it
          defers unmounting until its exit animation reports done, which still
          costs a frame even at zero duration. A repeat visitor should do no
          preloader work at all. */}
      {skipped ? null : (
      <AnimatePresence>
        {phase !== 'done' ? (
          <motion.div
            key="preloader"
            aria-hidden
            className="on-dark fixed inset-0 z-veil flex items-end bg-ink edge pb-[14vh]"
            exit={{ y: '-100%' }}
            /* Zero when skipped: the element is removed in the same commit as
               the layout effect, so it is never painted. */
            transition={{ duration: skipped ? 0 : 0.85, ease }}
          >
            <div className="w-full">
              <div className="mb-8 h-px w-full bg-line-dark">
                <motion.div
                  className="h-px bg-citrus"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: (step + 1) / WORDS.length }}
                  transition={{ duration: STEP_MS / 1000, ease: 'linear' }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
              <p className="display text-d1 text-paper">
                {WORDS[step]}
                <span className="text-citrus">.</span>
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      )}
      {children}
    </IntroReadyContext.Provider>
  );
}
