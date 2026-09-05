'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/layout/Logo';
import { MenuOverlay } from '@/components/layout/MenuOverlay';
import { homeSectionNav, primaryNav } from '@/data/navigation';
import { ease } from '@/lib/motion';
import { cx } from '@/lib/utils';

/** Pill segments shown on interior routes. */
const routeNav = primaryNav.slice(0, 4);

/**
 * Site header.
 *
 * Minimal at rest: a wordmark, a segmented index, and a menu trigger. The index
 * is the part that carries the page — on the homepage its segments fill in
 * cumulatively as you pass each section, so the nav doubles as a progress
 * reading of how far through the document you are. On interior routes it falls
 * back to marking the current page.
 *
 * The bar itself retreats when you scroll down and returns when you scroll up,
 * so it is never in the way of a full-bleed section but is always one gesture
 * away.
 */
export function Header() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const isHome = pathname === '/';

  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reached, setReached] = useState(0);
  /* Which ground the bar is currently sitting over. */
  const [onDark, setOnDark] = useState(false);
  const lastY = useRef(0);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /* Close the menu on navigation — the overlay unmounts with the route change
     otherwise only because the page happens to remount. */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    let frame = 0;

    /**
     * Direction. Deliberately synchronous, and deliberately separate from the
     * measuring work below: it is two number comparisons, and putting it behind
     * a rAF alongside a full pass over every section made the bar respond a
     * frame late and only after that work had run — which reads as the header
     * simply not getting out of the way.
     */
    const readDirection = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      /* Ignore sub-pixel jitter, or momentum scrolling toggles the bar. */
      if (Math.abs(delta) < 4) return;

      /* Never hide over the first screen, or it flickers during the hero's
         own entrance. */
      setHidden(y > 160 && delta > 0);
      lastY.current = y;
    };

    /** Measuring work: cheap enough per frame, too costly per scroll event. */
    const measure = () => {
      frame = 0;

      /* Tone. `mix-blend-difference` cannot be used for this: the header is
         transform-animated, which makes it its own stacking context, so the
         blend would have no page content in its backdrop and the bar would
         render invisible over a light page. Reading the band under the bar is
         explicit and works on every ground. */
      const probe = 34;
      const bands = document.querySelectorAll<HTMLElement>('[data-tone]');
      let tone: string | null = null;
      bands.forEach((band) => {
        const rect = band.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) tone = band.dataset.tone ?? null;
      });
      setOnDark(tone === 'dark');

      if (!isHome) return;

      /* Cumulative fill: the furthest section whose top has crossed the bar. */
      let index = 0;
      homeSectionNav.forEach((section, i) => {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= 90) index = i + 1;
      });
      setReached(index);
    };

    const onScroll = () => {
      readDirection();
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    lastY.current = window.scrollY;
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [isHome]);

  const segments = isHome
    ? homeSectionNav.map((s) => ({ label: s.label, href: `#${s.id}` }))
    : routeNav.map((s) => ({ label: s.label, href: s.href }));

  const isFilled = (index: number, href: string) =>
    isHome ? index < reached : pathname.startsWith(href);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-nav"
        animate={{ y: hidden && !menuOpen ? '-105%' : '0%' }}
        transition={{ duration: reduced ? 0 : 0.5, ease }}
      >
        <div
          className={cx(
            'edge flex items-center justify-between py-5 transition-colors duration-400 ease-tekton',
            onDark ? 'text-paper' : 'text-ink',
          )}
        >
          <Logo />

          {/* Segmented index. Hidden on small screens, where the full-screen
              menu is the only navigation and is better for it. */}
          <nav aria-label="Sections" className="hidden md:block">
            <ul className={cx('flex items-stretch border', onDark ? 'border-paper/25' : 'border-ink/20')}>
              {segments.map((segment, i) => {
                const filled = isFilled(i, segment.href);
                return (
                  <li
                    key={segment.href}
                    className={cx(
                      'border-r last:border-r-0',
                      onDark ? 'border-paper/25' : 'border-ink/20',
                    )}
                  >
                    <Link
                      href={segment.href}
                      className={cx(
                        'block px-4 py-2 text-label transition-colors duration-400 ease-tekton',
                        filled
                          ? onDark
                            ? 'bg-paper text-ink'
                            : 'bg-ink text-paper'
                          : onDark
                            ? 'text-paper hover:bg-paper/15'
                            : 'text-ink hover:bg-ink/10',
                      )}
                      aria-current={!isHome && filled ? 'page' : undefined}
                    >
                      {segment.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="group flex items-center gap-3 text-label uppercase tracking-[0.08em]"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            data-cursor="open"
          >
            Menu
            <span aria-hidden className="relative block h-3 w-6">
              <span className="absolute left-0 top-[3px] block h-px w-6 bg-current transition-transform duration-400 ease-tekton group-hover:translate-y-[2px]" />
              <span className="absolute left-0 bottom-[3px] block h-px w-6 bg-current transition-transform duration-400 ease-tekton group-hover:-translate-y-[2px]" />
            </span>
          </button>
        </div>
      </motion.header>

      <MenuOverlay open={menuOpen} onClose={closeMenu} />
    </>
  );
}
