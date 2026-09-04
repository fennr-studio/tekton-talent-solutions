/**
 * Photography.
 *
 * Sourced from Unsplash under the Unsplash Licence and referenced by URL, so
 * nothing is redistributed from this repository. Alt text describes what is
 * actually in each frame — none of these are Tekton's own offices, staff or
 * clients, and no caption anywhere on the site implies otherwise.
 *
 * `photographer` is recorded so attribution can be added if Tekton wants it;
 * the licence does not require it.
 */

const BASE = 'https://images.unsplash.com';

/** Unsplash serves the format and size we ask for; next/image handles the rest. */
function unsplash(id: string, width = 1600) {
  return `${BASE}/${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export type Photo = {
  src: string;
  alt: string;
};

export const photos = {
  /** Overhead flat-lay: laptops, notebooks and hands around a shared table. */
  workbench: {
    src: unsplash('photo-1519389950473-47ba0277781c', 2000),
    alt: 'Overhead view of a shared desk covered with open laptops, notebooks and phones as several people work together.',
  },
  /** Two colleagues at a laptop, one pointing at code on screen. */
  screening: {
    src: unsplash('photo-1531482615713-2afd69097998', 1600),
    alt: 'Two colleagues reviewing code together on a laptop screen in an open-plan office.',
  },
  /** Workshop: a facilitator at a whiteboard of sticky notes, team seated. */
  planning: {
    src: unsplash('photo-1552664730-d307ca884978', 1600),
    alt: 'A facilitator arranging sticky notes on a whiteboard while a seated team looks on during a planning workshop.',
  },
  /** An engineer with a laptop walking a lit server aisle. */
  infrastructure: {
    src: unsplash('photo-1573164713988-8665fc963095', 1600),
    alt: 'An engineer holding a laptop beside an illuminated row of server racks in a data centre.',
  },
  /** Long table, team mid-discussion. */
  team: {
    src: unsplash('photo-1521737604893-d14cc237f11d', 1600),
    alt: 'A team seated along a long wooden table in discussion, laptops open in front of them.',
  },
  /** Hands mid-gesture beside a laptop during a conversation. */
  conversation: {
    src: unsplash('photo-1517245386807-bb43f82c33c4', 1600),
    alt: 'Close view of a person gesturing with their hands while talking across a meeting table.',
  },
  /** Colleagues celebrating at a desk. */
  placement: {
    src: unsplash('photo-1600880292203-757bb62b4baf', 1600),
    alt: 'Two colleagues celebrating with a high five across a desk in a brick-walled office.',
  },
  /** Interlocked arms — partnership. */
  partnership: {
    src: unsplash('photo-1600880292089-90a7e086ee0c', 1400),
    alt: 'Several people gripping one another’s forearms in a linked circle above a meeting table.',
  },
  /** Quiet architectural interior, laptop at a window counter. */
  workplace: {
    src: unsplash('photo-1497215728101-856f4ea42174', 1600),
    alt: 'A laptop on a counter beside floor-to-ceiling windows in a quiet, plant-filled office.',
  },
  /** Team collaborating around a table. */
  collaboration: {
    src: unsplash('photo-1522071820081-009f0129c71c', 1600),
    alt: 'Colleagues working on laptops around a large table in a warm, wood-panelled room.',
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
