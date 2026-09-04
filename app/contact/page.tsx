import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/data/site';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Sticker } from '@/components/ui/Sticker';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { HiringForm } from '@/components/forms/HiringForm';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Talk to Tekton Talent Solutions about technology hiring, contract staffing or consulting. Hyderabad, India — PAN India technology and recruitment support.',
  path: '/contact',
  keywords: [
    'contact IT recruitment agency Hyderabad',
    'hire technology talent India',
    'staffing enquiry',
  ],
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        marker="Contact"
        lines={['Tell us what', 'you need', 'to build.']}
        fills={[0.6, 0.42, 0.55]}
        tag="One business day"
        lede="Send the requirement and we will come back within one business day with an approach, a timeline and a shortlist plan."
      />

      <Section tone="ink" space="chapter">
        <div className="edge">
          <div className="grid gap-x-[clamp(2rem,5vw,6rem)] gap-y-14 border-t border-line-dark pt-[clamp(2rem,4vw,4rem)] lg:grid-cols-[1fr_1.5fr]">
            <div>
              <ScrollReveal>
                <dl className="space-y-10">
                  <div>
                    <dt className="eyebrow text-paper/45">Email</dt>
                    <dd className="mt-2">
                      <a
                        href={`mailto:${site.email}`}
                        className="display-wide text-d4 text-paper transition-colors hover:text-citrus"
                        data-cursor="open"
                      >
                        {site.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-paper/45">Phone</dt>
                    <dd className="mt-2">
                      <a
                        href={`tel:${site.phoneHref}`}
                        className="display-wide text-d4 text-paper transition-colors hover:text-citrus"
                        data-cursor="open"
                      >
                        {site.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-paper/45">Office</dt>
                    <dd className="mt-2 text-body text-paper">
                      {site.city}, {site.region}, {site.country}
                      <span className="mt-1 block text-label text-paper/60">{site.coverage}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-paper/45">Looking for a role?</dt>
                    <dd className="mt-2 text-label text-paper/70">
                      Candidates should use the{' '}
                      <Link
                        href="/careers"
                        className="text-paper underline decoration-1 underline-offset-[6px] hover:text-citrus"
                      >
                        careers form
                      </Link>{' '}
                      so your CV reaches the right consultant.
                    </dd>
                  </div>
                </dl>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.08}>
              <p className="eyebrow text-paper/45">
                Hiring enquiry
                <Sticker tone="citrus" tilt={-4} className="ml-3">
                  Reply in 1 day
                </Sticker>
              </p>
              <div className="mt-8">
                <HiringForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Section>
    </>
  );
}
