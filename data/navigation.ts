import type { NavLink } from '@/types';

export const primaryNav: NavLink[] = [
  { label: 'About', href: '/about', note: 'Who we are, since 2021' },
  { label: 'Services', href: '/services', note: 'Hiring, consulting, delivery' },
  { label: 'Expertise', href: '/expertise', note: 'Platforms and industries' },
  { label: 'Women & work', href: '/women-and-work', note: 'WFH hiring, PAN India' },
  { label: 'Leadership', href: '/leadership', note: 'The people behind Tekton' },
  { label: 'Careers', href: '/careers', note: 'Send us your profile' },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Leadership', href: '/leadership' },
      { label: 'Women & work', href: '/women-and-work' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'What we do',
    links: [
      { label: 'IT recruitment', href: '/services#it-recruitment' },
      { label: 'Technology consulting', href: '/services#technology-consulting' },
      { label: 'IT services', href: '/services#it-services' },
      { label: 'Workforce solutions', href: '/services#workforce-solutions' },
      { label: 'Contract staffing', href: '/services#contract-staffing' },
      { label: 'Technical training', href: '/services#technical-training' },
    ],
  },
  {
    heading: 'Expertise',
    links: [
      { label: 'ServiceNow', href: '/expertise#servicenow' },
      { label: 'SAP', href: '/expertise#sap' },
      { label: 'Cybersecurity', href: '/expertise#cybersecurity' },
      { label: 'Cloud infrastructure', href: '/expertise#cloud-infrastructure' },
      { label: 'AI & machine learning', href: '/expertise#ai-machine-learning' },
      { label: 'Salesforce', href: '/expertise#salesforce' },
    ],
  },
];

/**
 * Segments in the header index on the homepage.
 *
 * Kept short deliberately: these fill in cumulatively as the visitor scrolls,
 * so the row doubles as a progress reading and has to stay legible at a glance.
 * The `id` of each must exist on the homepage or its segment never fills.
 */
export const homeSectionNav = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'expertise', label: 'Expertise' },
];

/** Longer section index, used for in-page anchors and the sitemap. */
export const homeSections = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'impact', label: 'Impact' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'india', label: 'India' },
  { id: 'women', label: 'Women & work' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'contact', label: 'Contact' },
];
