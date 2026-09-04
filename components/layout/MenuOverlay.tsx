'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ease } from '@/lib/motion';
import { primaryNav } from '@/data/navigation';
import { site } from '@/data/site';
import { cx } from '@/lib/utils';

type MenuOverlayProps = {
  open: boolean;
  onClose: () => void;
};

const links = [{ label: 'Home', href: '/', note: 'Start here' }, ...primaryNav, {
  label: 'Contact',
  href: '/contact',
  note: 'Build your team',
}];

/**
 * Full-screen navigation.
 *
 * The panel wipes down as one surface, then the links arrive individually out
 * of their masks — so the ground moves first and the type follows it, rather
 * than everything animating at once.
 *
 * Keyboard behaviour is the part that usually gets skipped on menus like this:
 * focus moves into the panel on open, is trapped inside while it is up, Escape
 * closes it, and focus returns to the trigger afterwards.
 */
export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.dataset.menu = 'open';

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      delete document.body.dataset.menu;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          ref={panelRef}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="on-dark fixed inset-0 z-menu flex flex-col bg-forest text-paper"
          initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="edge flex items-center justify-between py-6">
            <span className="eyebrow text-paper/60">Menu</span>
            <button
              type="button"
              onClick={onClose}
              className="group flex items-center gap-3 text-label uppercase tracking-[0.08em]"
              data-cursor="open"
            >
              Close
              <span className="relative block h-4 w-4">
                <span className="absolute left-0 top-1/2 block h-px w-4 rotate-45 bg-current transition-transform duration-400 ease-tekton group-hover:rotate-[135deg]" />
                <span className="absolute left-0 top-1/2 block h-px w-4 -rotate-45 bg-current transition-transform duration-400 ease-tekton group-hover:rotate-45" />
              </span>
            </button>
          </div>

          <nav className="edge flex flex-1 flex-col justify-center" aria-label="Primary">
            <ul onMouseLeave={() => setHovered(null)}>
              {links.map((link, i) => (
                <li key={link.href} className="border-t border-line-dark last:border-b">
                  <Link
                    href={link.href}
                    onClick={onClose}
                    onMouseEnter={() => setHovered(link.href)}
                    data-cursor="open"
                    className="group flex items-baseline justify-between gap-6 py-[clamp(0.5rem,1.4vw,1.1rem)]"
                  >
                    <span className="line-mask">
                      <motion.span
                        className={cx(
                          'display block text-d2 transition-colors duration-400 ease-tekton',
                          /* Dim the siblings, not the hovered item — the list
                             reads as one object with a focus, not eight items
                             each doing their own hover. */
                          hovered && hovered !== link.href ? 'text-paper/35' : 'text-paper',
                        )}
                        initial={reduced ? undefined : { y: '110%' }}
                        animate={{ y: '0%' }}
                        transition={{ duration: 0.9, ease, delay: 0.22 + i * 0.055 }}
                      >
                        {link.label}
                      </motion.span>
                    </span>
                    <motion.span
                      className="hidden shrink-0 text-label text-paper/50 sm:block"
                      initial={reduced ? undefined : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, ease, delay: 0.4 + i * 0.055 }}
                    >
                      {link.note}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="edge flex flex-wrap items-end justify-between gap-6 py-8 text-label text-paper/70"
            initial={reduced ? undefined : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
          >
            <div className="space-y-1">
              <a href={`mailto:${site.email}`} className="block hover:text-paper">
                {site.email}
              </a>
              <a href={`tel:${site.phoneHref}`} className="block hover:text-paper">
                {site.phone}
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="hover:text-paper"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
