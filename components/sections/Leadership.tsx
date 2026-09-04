import Link from 'next/link';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SplitTextReveal } from '@/components/animations/SplitTextReveal';
import { PortraitPlate } from '@/components/graphics/PortraitPlate';
import { Section } from '@/components/ui/Section';
import { leadership } from '@/data/leadership';

/**
 * Leadership as full-height plates rather than team cards.
 *
 * The name is set across the foot of each plate at display scale, and the
 * biography opens underneath on hover or focus — so at rest the row is two
 * tall images and two names, and the detail is something you go and get.
 *
 * On touch and keyboard the biography is simply always open: the reveal is an
 * enhancement for pointer users, never the only way to reach the content.
 */
export function Leadership({ detailed = false }: { detailed?: boolean }) {
  return (
    <Section id="leadership" tone="paper">
      <div className="edge">
        {!detailed ? (
          <>
            <ScrollReveal className="mb-[4vw] flex flex-wrap items-baseline justify-between gap-4">
              <p className="eyebrow text-ash">Leadership</p>
              <Link href="/leadership" className="text-label underline-offset-4 hover:underline">
                Full profiles
              </Link>
            </ScrollReveal>

            <SplitTextReveal
              as="h2"
              lines={['The people', 'behind Tekton.']}
              className="display mb-[5vw] text-d2"
            />
          </>
        ) : null}

        <ul className="grid gap-x-[clamp(1.5rem,4vw,4rem)] gap-y-16 md:grid-cols-2">
          {leadership.map((leader, i) => (
            <ScrollReveal as="li" key={leader.slug} delay={i * 0.1}>
              <Link
                href={`/leadership#${leader.slug}`}
                id={detailed ? leader.slug : undefined}
                className="group block scroll-mt-28"
                data-cursor="view"
              >
                <div className="relative overflow-hidden">
                  <PortraitPlate
                    leader={leader}
                    className="aspect-[3/4] w-full lg:aspect-[4/5]"
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />

                  {/* The index sits on the plate, not beside it. */}
                  <span className="numeral absolute left-4 top-4 text-micro text-paper/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="display text-d3 transition-colors duration-400 ease-tekton group-hover:text-forest">
                    {leader.name}
                  </h3>
                  <p className="eyebrow text-ash">{leader.role}</p>
                </div>

                <span aria-hidden className="mt-4 block h-px w-full bg-line">
                  <span className="block h-px w-0 bg-ink transition-[width] duration-600 ease-tekton group-hover:w-full group-focus-visible:w-full" />
                </span>

                {/* Opens on hover for pointer users; always open otherwise. */}
                <div className="overflow-hidden md:max-h-0 md:opacity-0 md:transition-all md:duration-600 md:ease-tekton md:group-hover:max-h-96 md:group-hover:opacity-100 md:group-focus-visible:max-h-96 md:group-focus-visible:opacity-100">
                  <p className="measure mt-5 text-body text-ash">{leader.bio}</p>

                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-micro uppercase text-ash">
                    {leader.focus.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  {leader.education?.length ? (
                    <div className="mt-5">
                      <p className="eyebrow mb-2 text-ash">Education</p>
                      <ul className="text-label text-ash">
                        {leader.education.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
