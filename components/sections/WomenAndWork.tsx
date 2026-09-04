import Link from 'next/link';
import { ImageReveal } from '@/components/animations/ImageReveal';
import { ParallaxImage } from '@/components/animations/ParallaxImage';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { Section } from '@/components/ui/Section';
import { Sticker } from '@/components/ui/Sticker';
import { photos } from '@/data/imagery';

const PILLARS = [
  {
    heading: 'Roles, not concessions',
    body: 'Remote roles are scoped against the same technical bar as onsite ones. The flexibility is in where the work happens, not in what it demands.',
  },
  {
    heading: 'Returning to work',
    body: 'Structured support for women re-entering technology careers after a break, including interview preparation and platform refreshers.',
  },
  {
    heading: 'Coaching that continues',
    body: 'Soft-skills and technical coaching led in-house, carrying on after the placement rather than stopping at the offer.',
  },
];

/**
 * The women-and-work chapter, given the scale of a story rather than a callout.
 *
 * The headline is set at full display size and the photograph runs the height
 * of the section beside it, overlapped by the type — the composition is the
 * argument that this is a commitment and not a campaign line.
 */
export function WomenAndWork() {
  return (
    <Section id="women" tone="mist" className="overflow-hidden">
      <div className="edge">
        <ScrollReveal className="mb-[4vw]">
          <p className="eyebrow text-ash">
            Women &amp; the future of work
            <Sticker tone="peach" tilt={-6} className="ml-3">
              First in PAN India
            </Sticker>
          </p>
        </ScrollReveal>

        <div className="relative grid gap-y-8 lg:grid-cols-12 lg:items-end">
          {/* Type sits above the image and overlaps it — the two share a column
              on wide screens instead of being politely separated. */}
          <div className="relative z-10 lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <SplitTextReveal
              as="h2"
              lines={['The future', 'of work is', 'more flexible.']}
              className="display text-d1"
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <ParallaxImage
              src={photos.infrastructure.src}
              alt={photos.infrastructure.alt}
              ratio="4/5"
              sizes="(max-width: 1024px) 100vw, 45vw"
              distance={10}
            />
          </div>
        </div>

        <div className="mt-[6vw] grid gap-x-[clamp(2rem,5vw,6rem)] gap-y-8 lg:grid-cols-[1fr_1fr]">
          <ScrollReveal>
            <p className="text-lede text-ink">
              Tekton is a women-encouraging company, pioneering inclusive hiring practices and
              professional growth.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="measure text-body text-ash">
              We are the first recruitment company providing dedicated work-from-home opportunities
              for women across PAN India. Our mission is to bridge the gap between career and home,
              ensuring professional excellence without borders.
            </p>
            <Link
              href="/women-and-work"
              className="mt-7 inline-block text-label uppercase tracking-[0.08em] underline decoration-1 underline-offset-[6px] hover:text-forest"
              data-cursor="view"
            >
              Read about the initiative
            </Link>
          </ScrollReveal>
        </div>

        <ul className="mt-[6vw] grid gap-x-[clamp(1.5rem,4vw,4rem)] gap-y-10 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <ScrollReveal as="li" key={pillar.heading} delay={i * 0.08}>
              <span aria-hidden className="mb-5 block h-px w-full bg-ink/20" />
              <h3 className="display-wide text-d4">{pillar.heading}</h3>
              <p className="mt-3 text-label text-ash">{pillar.body}</p>
            </ScrollReveal>
          ))}
        </ul>

        <div className="mt-[6vw] grid grid-cols-2 gap-3 md:gap-5">
          <ImageReveal
            src={photos.conversation.src}
            alt={photos.conversation.alt}
            ratio="16/10"
            sizes="50vw"
          />
          <ImageReveal
            src={photos.placement.src}
            alt={photos.placement.alt}
            ratio="16/10"
            delay={0.1}
            sizes="50vw"
          />
        </div>
      </div>
    </Section>
  );
}
