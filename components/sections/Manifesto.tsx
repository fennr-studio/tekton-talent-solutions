import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ImageReveal } from '@/components/animations/ImageReveal';
import { Section } from '@/components/ui/Section';
import { photos } from '@/data/imagery';

const STATEMENT = [
  'We connect',
  'enterprises with',
  "India's best",
  'technology talent.',
];

/**
 * The positioning statement: one sentence, set as large as the measure allows,
 * with the supporting picture band beneath it. Nothing else competes on this
 * screen — the whole point of the section is that a visitor reads one idea.
 */
export function Manifesto() {
  return (
    <Section id="about" tone="paper">
      <div className="edge">
        <SplitTextReveal
          as="h2"
          lines={STATEMENT}
          split="word"
          stagger={0.055}
          className="display mx-auto max-w-[22ch] text-center text-d2"
        />

        <ScrollReveal delay={0.15} className="mx-auto mt-[6vw] max-w-measure-wide text-center">
          <p className="text-lede text-ash">
            Tekton Talent Solutions turns blank requisitions into working teams, and technology
            roadmaps into delivery. We do it with a vetted PAN India network, a defined process,
            and specialists who have worked in the domains they screen for.
          </p>
        </ScrollReveal>

        {/* Four frames on one baseline, each uncovered a beat after the last. */}
        <div className="mt-[7vw] grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {[photos.planning, photos.screening, photos.workbench, photos.collaboration].map(
            (photo, i) => (
              <ImageReveal
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                ratio="4/5"
                delay={i * 0.09}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            ),
          )}
        </div>
      </div>
    </Section>
  );
}
