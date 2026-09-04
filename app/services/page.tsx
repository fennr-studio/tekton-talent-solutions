import type { Metadata } from 'next';
import { pageMetadata, servicesItemList } from '@/lib/metadata';
import { services } from '@/data/services';
import { photos } from '@/data/imagery';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { JsonLd } from '@/components/ui/JsonLd';
import { Sticker } from '@/components/ui/Sticker';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { ImageReveal } from '@/components/animations/ImageReveal';
import { FinalCta } from '@/components/sections/FinalCta';

export const metadata: Metadata = pageMetadata({
  title: 'Services',
  description:
    'IT recruitment, technology consulting, IT services, workforce solutions, contract staffing and technical training — delivered from Hyderabad across India.',
  path: '/services',
  keywords: [
    'IT recruitment services',
    'contract staffing India',
    'technology consulting',
    'RPO services',
    'contract to hire',
    'workforce solutions',
  ],
});

/** One frame per service, cycled so the page has visual variety at length. */
const FRAMES = [
  photos.screening,
  photos.planning,
  photos.infrastructure,
  photos.team,
  photos.conversation,
  photos.collaboration,
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesItemList()} />

      <PageHero
        marker="Services"
        lines={['Technology', 'expertise.', 'The right people.']}
        fills={[0.66, 0.44, 1]}
        lede="Six ways enterprises work with us. Every one of them runs on the same vetted network and the same defined process."
      />

      {/* Each service is a full band, alternating which side the picture sits on
          so the eye is never allowed to settle into a repeating template. */}
      {services.map((service, i) => (
        <Section
          key={service.slug}
          id={service.slug}
          tone={i % 2 === 0 ? 'paper' : 'mist'}
          className="scroll-mt-24"
        >
          <div className="edge">
            <div className="mb-[3vw] flex items-baseline gap-4">
              <span className="numeral text-micro text-ash">{service.index}</span>
              <span className="rule flex-1" />
            </div>

            <div
              className={`grid items-start gap-x-[clamp(2rem,5vw,6rem)] gap-y-10 lg:grid-cols-2 ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div>
                <SplitTextReveal
                  as="h2"
                  lines={[service.name]}
                  className="display text-d2"
                />
                <ScrollReveal delay={0.1}>
                  <p className="measure mt-6 text-lede text-ash">{service.summary}</p>
                  <p className="measure mt-5 text-body text-ash">{service.detail}</p>
                </ScrollReveal>

                <ScrollReveal delay={0.16} className="mt-9">
                  <p className="eyebrow mb-3 text-ash">Engagement models</p>
                  <ul className="flex flex-wrap gap-2">
                    {service.engagements.map((engagement, n) => (
                      <li key={engagement}>
                        <Sticker
                          tone={n % 3 === 0 ? 'citrus' : n % 3 === 1 ? 'lilac' : 'peach'}
                          tilt={n % 2 === 0 ? -3 : 3}
                          className="text-[0.7rem]"
                        >
                          {engagement}
                        </Sticker>
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              </div>

              <div>
                <ImageReveal
                  src={FRAMES[i % FRAMES.length].src}
                  alt={FRAMES[i % FRAMES.length].alt}
                  ratio="4/3"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <ScrollReveal delay={0.12} className="mt-8">
                  <p className="eyebrow mb-4 text-ash">What you get</p>
                  <ul>
                    {service.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="border-t border-current/15 py-3 text-body last:border-b"
                      >
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </Section>
      ))}

      <FinalCta />
    </>
  );
}
