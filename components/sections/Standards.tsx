import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { Section } from '@/components/ui/Section';
import { Sticker } from '@/components/ui/Sticker';
import { standards } from '@/data/standards';

/**
 * Certifications and practices, set as a numbered ledger.
 *
 * Certifications carry a sticker so the two accredited claims are visually
 * separable from the four practices at a glance — the distinction matters, and
 * a uniform grid would flatten it.
 */
export function Standards() {
  return (
    <Section id="standards" tone="mist">
      <div className="edge">
        <ScrollReveal className="mb-[4vw]">
          <p className="eyebrow text-ash">Standards</p>
        </ScrollReveal>

        <SplitTextReveal
          as="h2"
          lines={['Held to a', 'defined bar.']}
          className="display mb-[5vw] text-d2"
        />

        <dl>
          {standards.map((standard, i) => (
            <ScrollReveal key={standard.title} delay={i * 0.05}>
              <div className="grid items-baseline gap-x-[clamp(1rem,3vw,4rem)] gap-y-2 border-t border-ink/15 py-[clamp(1.25rem,2.4vw,2.25rem)] last:border-b sm:grid-cols-[auto_1fr_1.3fr]">
                <span className="numeral text-micro text-ash">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <dt className="display-wide text-d4">
                  {standard.title}
                  {standard.kind === 'certification' ? (
                    <Sticker tone="citrus" tilt={-4} className="ml-3">
                      Certified
                    </Sticker>
                  ) : null}
                </dt>
                <dd className="measure text-label text-ash">{standard.body}</dd>
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </Section>
  );
}
