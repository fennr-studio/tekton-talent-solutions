export const site = {
  name: 'Tekton Talent Solutions',
  legalName: 'Tekton Talent Solutions Pvt. Ltd.',
  shortName: 'Tekton',
  founded: '2021',
  tagline: "Empowering enterprise growth with India's tech advantage",
  description:
    "India's strategic partner for CMMI Level 3 certified IT recruitment and turnkey technology consulting, delivering excellence since 2021.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.tektontalentglobal.com',
  email: 'HRTekton@outlook.com',
  phone: '+91 6303069896',
  phoneHref: '+916303069896',
  city: 'Hyderabad',
  region: 'Telangana',
  country: 'India',
  coverage: 'PAN India technology and recruitment support',
  serviceLine: 'IT Services · IT Recruitment · FTE · C2H · C2C · RPO',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
    { label: 'Instagram', href: 'https://www.instagram.com' },
    { label: 'Facebook', href: 'https://www.facebook.com' },
    { label: 'YouTube', href: 'https://www.youtube.com' },
    { label: 'X', href: 'https://www.x.com' },
  ],
} as const;

/**
 * Keyword set the site is written to rank for. Used in metadata and to keep
 * copy on-message across pages.
 */
export const seoKeywords = [
  'IT recruitment',
  'technology recruitment',
  'contract staffing',
  'IT staffing',
  'technology consulting',
  'workforce solutions',
  'PAN India recruitment',
  'Hyderabad IT recruitment',
  'contract to hire',
  'RPO services',
  'ServiceNow recruitment',
  'SAP recruitment',
  'work from home jobs for women',
];
