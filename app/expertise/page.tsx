import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { technologyDomains } from '@/data/technology-domains';
import { photos } from '@/data/imagery';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Sticker } from '@/components/ui/Sticker';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { ParallaxImage } from '@/components/animations/ParallaxImage';
import { FinalCta } from '@/components/sections/FinalCta';

export const metadata: Metadata = pageMetadata({
  title: 'Industries & technology domains',
  description:
    'Specialist technology recruitment across ServiceNow, SAP, cybersecurity, cloud infrastructure, AI and machine learning, and Salesforce — for enterprises across India.',
  path: '/expertise',
  keywords: [
    'ServiceNow recruitment',
    'SAP recruitment India',
    'cybersecurity hiring',
    'cloud engineer recruitment',
    'AI machine learning recruitment',
    'Salesforce consultants India',
  ],
});

/**
 * NEEDS CLIENT CONFIRMATION BEFORE LAUNCH.
 *
 * The source site says Tekton "supports clients across multiple industries"
 * without naming any. The eight below are a plausible reading of the practice,
 * not a claim taken from the source. Confirm, trim or replace with Tekton.
 */
const INDUSTRIES = [
  'Banking and financial services',
  'Insurance',
  'Healthcare and life sciences',
  'Retail and e-commerce',
  'Manufacturing',
  'Telecommunications',
  'Technology and software product',
  'Public sector and utilities',
];

export default function ExpertisePage() {
  return (
    <>
      <PageHero
        marker="Industries & technology domains"
        lines={['Where our', 'network runs', 'deepest.']}
        fills={[0.5, 0.82, 0.62]}
        lede="Tekton supports clients across multiple industries and specialised technology domains. These six are where our screening panels, our network and our delivery experience are strongest."
      />

      {technologyDomains.map((domain, i) => (
        <Section
          key={domain.slug}
          id={domain.slug}
          tone={i % 2 === 0 ? 'paper' : 'mist'}
          className="scroll-mt-24"
          space="tight"
        >
          <div className="edge">
            <div className="grid items-baseline gap-x-[clamp(1.5rem,4vw,5rem)] gap-y-5 border-t border-current/15 pt-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="eyebrow mb-3 text-ash">
                  <span className="numeral mr-3">{String(i + 1).padStart(2, '0')}</span>
                  {domain.category}
                </p>
                <SplitTextReveal
                  as="h2"
                  lines={[domain.name]}
                  className="display text-d1"
                />
              </div>

              <ScrollReveal delay={0.1}>
                <p className="measure text-lede text-ash">{domain.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {domain.capabilities.map((capability, n) => (
                    <li key={capability}>
                      <Sticker
                        tone={n % 3 === 0 ? 'lilac' : n % 3 === 1 ? 'citrus' : 'peach'}
                        tilt={n % 2 === 0 ? -3 : 4}
                        className="text-[0.7rem]"
                      >
                        {capability}
                      </Sticker>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </Section>
      ))}

      <Section tone="ink">
        <div className="edge">
          <div className="grid gap-x-[clamp(2rem,5vw,6rem)] gap-y-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <ScrollReveal>
                <p className="eyebrow mb-6 text-paper/50">Industries</p>
              </ScrollReveal>
              <SplitTextReveal
                as="h2"
                lines={['Sectors we', 'hire into.']}
                className="display mb-[3vw] text-d2 text-paper"
              />
              <ul>
                {INDUSTRIES.map((industry, i) => (
                  <ScrollReveal as="li" key={industry} delay={i * 0.04}>
                    <span className="block border-t border-line-dark py-3 text-body text-paper/80">
                      {industry}
                    </span>
                  </ScrollReveal>
                ))}
              </ul>
            </div>

            <ParallaxImage
              src={photos.infrastructure.src}
              alt={photos.infrastructure.alt}
              ratio="3/4"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
