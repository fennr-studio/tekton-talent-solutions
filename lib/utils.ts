/** Tailwind-friendly conditional class joiner. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/**
 * Deterministic pseudo-random generator (mulberry32).
 * Used for generated graphics so the server and client render identical
 * markup and hydration stays clean.
 */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function round(value: number, places = 2): number {
  const f = 10 ** places;
  return Math.round(value * f) / f;
}
