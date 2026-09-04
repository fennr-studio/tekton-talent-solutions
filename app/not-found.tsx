import { MagneticButton } from '@/components/animations/MagneticButton';
import { FitText } from '@/components/animations/FitText';

export default function NotFound() {
  return (
    <section data-tone="dark" className="on-dark flex min-h-[100svh] w-full flex-col justify-between bg-ink py-[clamp(2.5rem,6vw,5rem)] text-paper">
      <div className="edge">
        <p className="eyebrow text-paper/50">Error 404</p>
      </div>

      <div className="edge" aria-hidden>
        <FitText className="display text-paper">Not found</FitText>
      </div>

      <div className="edge">
        <div className="grid gap-8 border-t border-line-dark pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 className="display-wide text-d4">That page has moved on.</h1>
            <p className="measure mt-4 text-body text-paper/70">
              The link is broken or the page no longer exists. Start again from the homepage, or
              tell us what you were looking for.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticButton href="/" className="bg-paper text-ink hover:bg-citrus">
              Back to home
            </MagneticButton>
            <MagneticButton href="/contact" variant="outline">
              Contact us
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
