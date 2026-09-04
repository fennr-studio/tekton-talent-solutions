'use client';

import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ease, inView } from '@/lib/motion';
import { cx } from '@/lib/utils';

type ImageRevealProps = {
  src: string;
  alt: string;
  /** Aspect ratio as a CSS value, e.g. '3/4'. Square corners are the default. */
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  delay?: number;
  /** Scale the image inside its frame as it is uncovered. */
  scale?: boolean;
};

/**
 * An image that is uncovered rather than faded in: the frame wipes open with a
 * clip-path while the image itself settles back from a slight overscale, so the
 * two move at different rates and the reveal reads as depth.
 *
 * The element that carries the clip-path is deliberately *not* the element that
 * triggers the animation. Chrome folds an element's own `clip-path` into the
 * area IntersectionObserver measures, so an element that starts clipped to
 * nothing reports `intersectionRatio: 0` — and a `whileInView` threshold on
 * that same element can never be met. It would sit invisible forever. The outer
 * frame is observed and never clipped; the clip lives one level in and is
 * driven by inherited variants.
 */
const frameVariants: Variants = {
  hidden: { clipPath: 'inset(0% 0% 100% 0%)' },
  visible: (delay: number = 0) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 1.15, ease, delay },
  }),
};

const imageVariants: Variants = {
  hidden: { scale: 1.14 },
  visible: (delay: number = 0) => ({
    scale: 1,
    transition: { duration: 1.4, ease, delay },
  }),
};

export function ImageReveal({
  src,
  alt,
  ratio = '4/3',
  className,
  sizes = '(max-width: 1024px) 100vw, 50vw',
  priority = false,
  delay = 0,
  scale = true,
}: ImageRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div
        className={cx('relative overflow-hidden bg-mist', className)}
        style={{ aspectRatio: ratio }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <motion.div
      className={cx('relative', className)}
      style={{ aspectRatio: ratio }}
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      custom={delay}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden bg-mist"
        variants={frameVariants}
        custom={delay}
      >
        <motion.div
          className="absolute inset-0"
          variants={scale ? imageVariants : undefined}
          custom={delay}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
