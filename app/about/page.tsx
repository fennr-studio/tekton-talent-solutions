import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { site } from '@/data/site';
import { coreCapabilities } from '@/data/standards';
import { photos } from '@/data/imagery';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { ImageReveal } from '@/components/animations/ImageReveal';
import { ParallaxImage } from '@/components/animations/ParallaxImage';
import { ImpactStats } from '@/components/sections/ImpactStats';
import { Standards } from '@/components/sections/Standards';
import { FinalCta } from '@/components/sections/FinalCta';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'Tekton Talent Solutions Pvt. Ltd. is a technology recruitment and IT services company established in 2021 in Hyderabad, with PAN India remote and onsite delivery.',
  path: '/about',
  keywords: [
    'about Tekton Talent Solutions',
    'IT recruitment company Hyderabad',
    'technology recruitment India',
  ],
});

/** The story, told as three beats that reveal in sequence down the page. */
const STORY = [
  {
    lead: 'From',
    heading: 'a bold idea',
    body: `Tekton was founded in ${site.founded} by a team that had spent years on both sides of technology hiring — inside recruitment, and inside engineering. That combination is still the point of the company: recruitment expertise, technical knowledge, industry understanding and a strong commitment to quality, applied to the same problem.`,
  },
  {
    lead: 'To',
    heading: 'PAN-India impact',
    body: 'We work with enterprises that are modernising platforms, scaling delivery teams or entering India for the first time. Requirements arrive as roles; they leave as calibrated scorecards, screened shortlists and people who start on time.',
  },
  {
    lead: 'Built in',
    heading: site.city,
    body: 'Our headquarters is in Hyderabad. Delivery is not: teams are assembled remote, onsite or blended, wherever the skill actually lives.',
  },
];

const PRINCIPLES = [
  {
    title: 'Screen for depth, not keywords',
    body: 'Profiles are assessed by people who have worked in the domain. A ServiceNow shortlist is reviewed by someone who understands the difference between ITSM configuration and platform engineering.',
  },
  {
    title: 'One process, every engagement',
    body: 'The CMMI Level 3 appraisal and ISO 9001:2015 certification are not decoration. They describe how roles are scoped, how candidates are assessed and how mistakes are corrected.',
  },
  {
    title: 'Stay past the offer',
    body: 'Onboarding, extensions and conversions are part of the engagement. A placement that does not last is not a placement.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        marker={`About · established ${site.founded}`}
        lines={['Recruitment', 'run like an', 'engineering practice.']}
        fills={[0.62, 0.72, 1]}
        lede={`${site.legalName} is a technology recruitment and IT services company established in ${site.founded}. We connect organisations with skilled technology professionals and provide reliable technology solutions that support business growth.`}
      />

      <Section tone="paper" space="tight">
        <div className="edge">
          <ParallaxImage
            src={photos.workbench.src}
            alt={photos.workbench.alt}
            ratio="21/9"
            sizes="100vw"
            priority
            distance={8}
          />
        </div>
      </Section>

      {/* The narrative: each beat is a screen of its own, so the story is
          revealed by scrolling rather than read as one block of prose. */}
      <Section tone="paper">
        <div className="edge">
          {STORY.map((beat, i) => (
            <div
              key={beat.heading}
              className="grid items-start gap-x-[clamp(2rem,6vw,7rem)] gap-y-6 border-t border-line py-[clamp(3rem,7vw,7rem)] last:border-b lg:grid-cols-[1.1fr_1fr]"
            >
              <div>
                <ScrollReveal delay={0.05}>
                  <p className="eyebrow mb-4 text-ash">{beat.lead}</p>
                </ScrollReveal>
                <SplitTextReveal
                  as="h2"
                  lines={[beat.heading]}
                  className="display text-d2"
                  delay={i * 0.02}
                />
              </div>
              <ScrollReveal delay={0.14} className="lg:pt-[3vw]">
                <p className="measure text-lede text-ash">{beat.body}</p>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="forest">
        <div className="edge grid gap-x-[clamp(2rem,5vw,6rem)] gap-y-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <ScrollReveal>
              <p className="eyebrow mb-6 text-paper/50">Core capabilities</p>
            </ScrollReveal>
            <ul>
              {coreCapabilities.map((capability, i) => (
                <ScrollReveal as="li" key={capability} delay={i * 0.04}>
                  <span className="display block border-t border-line-dark py-[clamp(0.5rem,1.2vw,1rem)] text-d4 text-paper">
                    {capability}
                  </span>
                </ScrollReveal>
              ))}
            </ul>
          </div>
          <ImageReveal
            src={photos.team.src}
            alt={photos.team.alt}
            ratio="4/5"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </Section>

      <ImpactStats />

      <Section tone="paper">
        <div className="edge">
          <ScrollReveal className="mb-[4vw]">
            <p className="eyebrow text-ash">How we work</p>
          </ScrollReveal>
          <dl>
            {PRINCIPLES.map((principle, i) => (
              <ScrollReveal key={principle.title} delay={i * 0.06}>
                <div className="grid gap-x-[clamp(1.5rem,4vw,5rem)] gap-y-3 border-t border-line py-[clamp(1.5rem,3vw,2.75rem)] last:border-b sm:grid-cols-[1fr_1.3fr]">
                  <dt className="display text-d3">{principle.title}</dt>
                  <dd className="measure text-body text-ash sm:pt-2">{principle.body}</dd>
                </div>
              </ScrollReveal>
            ))}
          </dl>
        </div>
      </Section>

      <Standards />
      <FinalCta />
    </>
  );
}
