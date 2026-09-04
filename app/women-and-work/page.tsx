import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { photos } from '@/data/imagery';
import { PageHero } from '@/components/ui/PageHero';
import { Section } from '@/components/ui/Section';
import { Sticker } from '@/components/ui/Sticker';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { ParallaxImage } from '@/components/animations/ParallaxImage';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { Culture } from '@/components/sections/Culture';

export const metadata: Metadata = pageMetadata({
  title: 'Women & the future of work',
  description:
    'Tekton Talent Solutions provides dedicated work-from-home opportunities for women across PAN India, bridging the gap between career and home without lowering the technical bar.',
  path: '/women-and-work',
  keywords: [
    'work from home jobs for women India',
    'WFH recruitment for women',
    'women in technology hiring',
    'inclusive hiring India',
    'remote jobs for women',
  ],
});

const PILLARS = [
  {
    title: 'A route back after a break',
    body: 'Careers pause for reasons that have nothing to do with capability. We support women returning to technology with platform refreshers, interview preparation and honest feedback.',
  },
  {
    title: 'Coaching that outlasts the offer',
    body: 'Technical and soft-skills coaching is led in-house by our director. It continues after placement, because the first six months decide how a career goes.',
  },
  {
    title: 'Employers who mean it',
    body: 'We brief hiring managers on what remote-first actually requires — asynchronous reviews, documented decisions, meeting hours that respect a household.',
  },
  {
    title: 'The same technical bar',
    body: 'Every role in the programme is a live client requirement, screened by the same specialist panels against the same scorecard as any other hire on the team.',
  },
];

export default function WomenAndWorkPage() {
  return (
    <>
      <PageHero
        marker="Women & the future of work"
        lines={['The future', 'of work is', 'more flexible.']}
        fills={[0.52, 0.58, 1]}
        tag="First in PAN India"
        lede="Tekton is a women-encouraging company, pioneering inclusive hiring practices and professional growth."
      />

      <Section tone="paper" space="tight">
        <div className="edge">
          <ParallaxImage
            src={photos.infrastructure.src}
            alt={photos.infrastructure.alt}
            ratio="21/9"
            sizes="100vw"
            priority
            distance={8}
          />
        </div>
      </Section>

      <Section tone="mist">
        <div className="edge">
          <div className="grid gap-x-[clamp(2rem,5vw,6rem)] gap-y-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <ScrollReveal>
                <p className="eyebrow mb-6 text-ash">The initiative</p>
              </ScrollReveal>
              <SplitTextReveal
                as="h2"
                lines={['Leading WFH', 'recruitment', 'in PAN India.']}
                className="display text-d2"
              />
            </div>

            <ScrollReveal delay={0.12} className="lg:pt-[2vw]">
              <p className="measure text-lede text-ink">
                We are the first recruitment company providing dedicated work-from-home
                opportunities for women across PAN India. Our mission is to bridge the gap between
                career and home, ensuring professional excellence without borders.
              </p>
              <p className="measure mt-5 text-body text-ash">
                India loses experienced technologists every year — not to other industries, but to a
                hiring model that assumes proximity. Skills do not expire during a career break, and
                they do not weaken at a distance of a thousand kilometres.
              </p>
              <p className="measure mt-5 text-body text-ash">
                This programme exists to reopen those roles: sourced against real enterprise
                requirements, screened by the same specialist panels, and supported after the
                placement rather than at the point of it.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.1} className="mt-[6vw]">
            <p className="display max-w-[18ch] text-d2">
              Professional excellence without borders
              <Sticker tone="peach" tilt={5} className="ml-[0.2em] align-super">
                Remote-first
              </Sticker>
            </p>
          </ScrollReveal>

          <ul className="mt-[6vw] grid gap-x-[clamp(1.5rem,4vw,4rem)] gap-y-10 sm:grid-cols-2">
            {PILLARS.map((pillar, i) => (
              <ScrollReveal as="li" key={pillar.title} delay={i * 0.06}>
                <span aria-hidden className="mb-5 block h-px w-full bg-ink/20" />
                <h3 className="display text-d3">{pillar.title}</h3>
                <p className="measure mt-3 text-body text-ash">{pillar.body}</p>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </Section>

      <Culture />

      <Section tone="ink">
        <div className="edge">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <SplitTextReveal
              as="h2"
              lines={['If the role is right,', 'the location', 'is a detail.']}
              className="display text-d2 text-paper"
            />
            <ScrollReveal delay={0.1}>
              <p className="measure text-body text-paper/70">
                Send us your profile and tell us how you want to work. We will match it against live
                requirements, including the work-from-home programme.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton
                  href="/careers"
                  className="bg-paper text-ink hover:bg-citrus"
                  data-cursor="explore"
                >
                  Send my profile
                </MagneticButton>
                <MagneticButton href="/contact" variant="outline" data-cursor="explore">
                  Hire through the programme
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Section>
    </>
  );
}
