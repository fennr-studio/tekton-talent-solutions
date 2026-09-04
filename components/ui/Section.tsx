import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';

type Tone = 'paper' | 'mist' | 'forest' | 'ink';

const TONE: Record<Tone, string> = {
  paper: 'bg-paper text-ink',
  mist: 'bg-mist text-ink',
  forest: 'on-dark bg-forest text-paper',
  ink: 'on-dark bg-ink text-paper',
};

type SectionProps = {
  children: ReactNode;
  id?: string;
  tone?: Tone;
  className?: string;
  /** Vertical rhythm. `flush` lets a section own its own spacing entirely. */
  space?: 'chapter' | 'tight' | 'flush';
  'aria-label'?: string;
};

/**
 * A full-bleed band.
 *
 * There is deliberately no centred max-width container here. Sections run edge
 * to edge and content is positioned inside them on a grid, which is what allows
 * display type to be set at viewport scale without being trapped in a column
 * narrower than the text it has to hold.
 */
export function Section({
  children,
  id,
  tone = 'paper',
  className,
  space = 'chapter',
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      /* Read by the header to decide whether it should draw light or dark over
         this band. See components/layout/Header.tsx. */
      data-tone={tone === 'forest' || tone === 'ink' ? 'dark' : 'light'}
      className={cx(
        'relative w-full',
        TONE[tone],
        space === 'chapter' && 'py-chapter',
        space === 'tight' && 'py-[clamp(3rem,7vw,7rem)]',
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
