import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { ImageReveal } from '@/components/animations/ImageReveal';
import { Section } from '@/components/ui/Section';
import { cultureStories } from '@/data/standards';
import { photos } from '@/data/imagery';

/** One frame per story, in order. */
const FRAMES = [photos.placement, photos.partnership, photos.collaboration];

/**
 * Culture, told in three frames. The picture leads and the text follows
 * underneath it, which is the inverse of every other block on the site — the
 * change of order is what stops a three-column row reading as a card grid.
 */
export function Culture() {
  return (
    <Section id="culture" tone="paper">
      <div className="edge">
        <ScrollReveal className="mb-[4vw]">
          <p className="eyebrow text-ash">Culture</p>
        </ScrollReveal>

        <SplitTextReveal
          as="h2"
          lines={['One team,', 'many places.']}
          className="display mb-[5vw] text-d2"
        />

        <ul className="grid gap-x-[clamp(1.5rem,4vw,4rem)] gap-y-12 md:grid-cols-3">
          {cultureStories.map((story, i) => (
            <li key={story.title}>
              <ImageReveal
                src={FRAMES[i % FRAMES.length].src}
                alt={FRAMES[i % FRAMES.length].alt}
                ratio="4/5"
                delay={i * 0.08}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <ScrollReveal delay={0.1 + i * 0.06}>
                <h3 className="display mt-6 text-d4">{story.title}</h3>
                <p className="mt-3 text-label text-ash">{story.body}</p>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
