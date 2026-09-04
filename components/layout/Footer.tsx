import Link from 'next/link';
import { FitText } from '@/components/animations/FitText';
import { MarqueeText } from '@/components/animations/MarqueeText';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { footerNav } from '@/data/navigation';
import { site } from '@/data/site';

/**
 * The last chapter.
 *
 * Ends on the wordmark set as large as the page will allow — the one moment the
 * name is the whole composition. Everything functional (navigation, contact,
 * legal) is resolved above it, so the closing frame carries no obligations.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer data-tone="dark" className="on-dark relative w-full overflow-hidden bg-forest text-paper">
      <div className="edge pt-[clamp(3rem,7vw,7rem)]">
        <div className="grid gap-x-[clamp(2rem,5vw,5rem)] gap-y-12 lg:grid-cols-[1.1fr_2fr]">
          <ScrollReveal>
            <p className="display text-d3 text-paper">
              Technology
              <br />
              recruitment,
              <br />
              done properly.
            </p>
            <address className="mt-8 not-italic text-label text-paper/70">
              <p>{site.legalName}</p>
              <p className="mt-1">
                {site.city}, {site.region}, {site.country}
              </p>
              <p className="mt-4">
                <a href={`mailto:${site.email}`} className="hover:text-paper">
                  {site.email}
                </a>
              </p>
              <p>
                <a href={`tel:${site.phoneHref}`} className="hover:text-paper">
                  {site.phone}
                </a>
              </p>
            </address>
          </ScrollReveal>

          <nav aria-label="Footer" className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
            {footerNav.map((group, i) => (
              <ScrollReveal key={group.heading} delay={i * 0.06}>
                <h2 className="eyebrow mb-5 text-paper/45">{group.heading}</h2>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-label text-paper/75 transition-colors duration-400 ease-tekton hover:text-paper"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </nav>
        </div>

        <div className="mt-[clamp(3rem,6vw,5rem)] flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-line-dark pt-6">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-label text-paper/70">
            {site.social.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-paper"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>

          <p className="text-micro uppercase text-paper/45">
            © {year} {site.legalName} · CMMI Level 3 · ISO 9001:2015
          </p>
        </div>

        {/* Service line, moving quietly above the wordmark. */}
        <MarqueeText
          items={['IT services', 'IT recruitment', 'FTE', 'C2H', 'C2C', 'RPO']}
          className="mt-10 border-y border-line-dark py-3 text-label text-paper/50"
          duration={52}
        />
      </div>

      {/* The wordmark, sized to the page. Overflow is clipped at the section so
          the descender sits flush against the bottom edge. */}
      <div className="edge -mb-[0.16em] mt-[clamp(1.5rem,3vw,3rem)]" aria-hidden>
        <FitText className="display text-paper">Tekton</FitText>
      </div>
    </footer>
  );
}
