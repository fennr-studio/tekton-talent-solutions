'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cx } from '@/lib/utils';

type ParallaxImageProps = {
  src: string;
  alt: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Travel in percent of the frame height. Negative moves against the scroll. */
  distance?: number;
};

/**
 * Scroll parallax done inside the frame rather than on it: the picture is
 * overscaled and slides within a fixed crop, so the layout never moves and
 * nothing reflows — only the image content drifts.
 */
export function ParallaxImage({
  src,
  alt,
  ratio = '3/4',
  className,
  sizes = '(max-width: 1024px) 100vw, 45vw',
  priority = false,
  distance = 12,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-distance}%`, `${distance}%`]);

  return (
    <div
      ref={ref}
      className={cx('relative overflow-hidden bg-mist', className)}
      style={{ aspectRatio: ratio }}
    >
      <motion.div
        className="absolute inset-x-0 -inset-y-[18%]"
        style={reduced ? undefined : { y }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
    </div>
  );
}
