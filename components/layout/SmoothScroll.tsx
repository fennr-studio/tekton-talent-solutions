'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Smooth scrolling, and the single place where Lenis and ScrollTrigger are
 * married.
 *
 * The two must share one clock. Lenis is driven from GSAP's ticker rather than
 * its own rAF loop, and ScrollTrigger updates on Lenis's scroll event — without
 * both halves, pinned sections drift a frame behind the content and the whole
 * page feels loose.
 *
 * Lenis is skipped entirely for reduced-motion visitors and on coarse pointers,
 * where the platform's own momentum scrolling is better than anything we can
 * synthesise.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;

    if (reduced || coarse) {
      /* Still refresh, so scroll-triggered reveals measure correctly even
         though nothing is being smoothed. */
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    /* GSAP's lag smoothing fights an external scroll source: it can skip the
       ticker entirely after a long frame, which strands Lenis mid-scroll. */
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  /* Route changes replace the whole document flow; triggers measured against
     the previous page are stale until they are recalculated. */
  useEffect(() => {
    window.scrollTo(0, 0);
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
