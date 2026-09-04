export type NavLink = {
  label: string;
  href: string;
  /** Short line shown in the mobile menu and desktop mega-list. */
  note?: string;
};

export type Service = {
  slug: string;
  index: string;
  name: string;
  summary: string;
  /** Longer paragraph used on the services page. */
  detail: string;
  engagements: string[];
  deliverables: string[];
};

export type TechnologyDomain = {
  slug: string;
  category: string;
  name: string;
  summary: string;
  capabilities: string[];
};

export type Leader = {
  slug: string;
  name: string;
  role: string;
  /** Monogram shown when no portrait file is present. */
  monogram: string;
  portrait?: string;
  bio: string;
  focus: string[];
  education?: string[];
};

export type Stat = {
  /** Numeric target for the counter; omit for non-numeric facts. */
  value?: number;
  prefix?: string;
  suffix?: string;
  /** Rendered instead of the counter when `value` is absent. */
  display?: string;
  label: string;
  note?: string;
};

export type Standard = {
  title: string;
  body: string;
  kind: 'certification' | 'practice';
};

export type CultureStory = {
  title: string;
  body: string;
};

export type SectionMeta = {
  id: string;
  label: string;
};
