'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Single registration point for GSAP plugins.
 *
 * ScrollTrigger touches `document` at import time, so every module that needs
 * it imports from here and the registration happens exactly once, on the
 * client. `gsap.registerPlugin` is idempotent, but keeping one call site means
 * there is one place to add plugins and one place to look when a trigger does
 * not fire.
 */
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  /* Lenis drives scroll position; ScrollTrigger must not also try to smooth or
     restore it. SmoothScroll wires the ticker and the scrollerProxy. */
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };
