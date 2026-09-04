import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { technologyDomains } from '@/data/technology-domains';
import { site } from '@/data/site';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { CareerForm } from '@/components/forms/CareerForm';

export const metadata: Metadata = pageMetadata({
  title: 'Careers',
  description:
    'Send your profile to Tekton Talent Solutions. Permanent, contract and work-from-home technology roles across ServiceNow, SAP, cybersecurity, cloud, AI and Salesforce.',
  path: '/careers',
  keywords: [
    'IT jobs India',
    'technology jobs Hyderabad',
    'contract IT jobs',
    'work from home tech jobs for women',
    'submit resume IT recruitment',
  ],
});

const STEPS = [
  {
    title: 'You send a profile',
    body: 'One form, one CV. Tell us the role you want and how you want to work — onsite, remote, hybrid or through the work-from-home programme.',
  },
  {
    title: 'A specialist reads it',
    body: 'Profiles are reviewed by a consultant who knows the domain, not filtered by keyword match. You will hear back either way.',
  },
  {
    title: 'We prepare you properly',
    body: 'If there is a fit, you get the scorecard, the context and interview preparation before you meet the client.',
  },
  {
    title: 'We stay in touch',
    body: 'Placed or not, your profile stays in our network and we come back when a matching requirement opens.',
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        marker="Careers · join us"
        lines={['Send it once.', 'We match it', 'against live roles.']}
        fills={[0.56, 0.5, 1]}
        lede="We hire for permanent, contract, contract-to-hire and project engagements across India, including dedicated work-from-home roles for women."
      />

      <Section tone="mist">
        <div className="edge">
          <ScrollReveal className="mb-[4vw]">
            <p className="eyebrow text-ash">What happens next</p>
          </ScrollReveal>

          {/* A genuine sequence, so the steps are numbered. */}
          <ol>
            {STEPS.map((step, i) => (
              <ScrollReveal as="li" key={step.title} delay={i * 0.05}>
                <div className="grid gap-x-[clamp(1.5rem,4vw,5rem)] gap-y-3 border-t border-ink/15 py-[clamp(1.5rem,3vw,2.75rem)] last:border-b sm:grid-cols-[auto_1fr_1.2fr]">
                  <p className="numeral text-micro text-ash sm:pt-3">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h2 className="display text-d3">{step.title}</h2>
                  <p className="measure text-body text-ash sm:pt-2">{step.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="paper">
        <div className="edge">
          <div className="grid gap-x-[clamp(2rem,5vw,6rem)] gap-y-14 lg:grid-cols-[1fr_1.4fr]">
            <ScrollReveal>
              <h2 className="eyebrow text-ash">Domains we hire for</h2>
              <ul className="mt-6">
                {technologyDomains.map((domain) => (
                  <li key={domain.slug} className="border-t border-line last:border-b">
                    <span className="display block py-[clamp(0.4rem,1vw,0.9rem)] text-d4">
                      {domain.name}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="measure mt-6 text-label text-ash">
                Not on the list? Send your profile anyway — requirements change every week.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <p className="eyebrow text-ash">Your details</p>
              <div className="mt-8">
                <CareerForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <div className="edge">
          <SplitTextReveal
            as="h2"
            lines={['Prefer email?', 'That works too.']}
            className="display text-d2 text-paper"
          />
          <ScrollReveal delay={0.1}>
            <p className="measure mt-8 text-lede text-paper/70">
              Send your CV to{' '}
              <a
                href={`mailto:${site.email}`}
                className="text-paper underline decoration-1 underline-offset-[6px] hover:text-citrus"
                data-cursor="open"
              >
                {site.email}
              </a>{' '}
              or call{' '}
              <a
                href={`tel:${site.phoneHref}`}
                className="text-paper underline decoration-1 underline-offset-[6px] hover:text-citrus"
                data-cursor="open"
              >
                {site.phone}
              </a>
              .
            </p>
          </ScrollReveal>
        </div>
      </Section>
    </>
  );
}
