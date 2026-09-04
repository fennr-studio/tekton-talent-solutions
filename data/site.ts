/** The canonical origin, used for metadata, the sitemap and JSON-LD. */
const PRODUCTION_URL = 'https://www.tektontalentglobal.com';

/**
 * Resolve the site origin from the environment.
 *
 * An environment variable that exists but is empty is the normal case on a
 * hosting dashboard where someone added the key and left the value blank — and
 * `??` does not catch it, because an empty string is neither null nor
 * undefined. `new URL('')` then throws and takes the whole build down at page
 * collection, which is a long way from the cause. Treat blank as unset, and
 * verify the result actually parses before handing it to `new URL`.
 *
 * Deliberately not falling back to `VERCEL_URL`: that is the per-deployment
 * host, so canonicals and the sitemap would point at preview builds.
 */
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return PRODUCTION_URL;

  // Trailing slashes would double up in `${site.url}${path}`.
  const normalised = configured.replace(/\/+$/, '');

  try {
    new URL(normalised);
    return normalised;
  } catch {
    return PRODUCTION_URL;
  }
}

export const site = {
  name: 'Tekton Talent Solutions',
  legalName: 'Tekton Talent Solutions Pvt. Ltd.',
  shortName: 'Tekton',
  founded: '2021',
  tagline: "Empowering enterprise growth with India's tech advantage",
  description:
    "India's strategic partner for CMMI Level 3 certified IT recruitment and turnkey technology consulting, delivering excellence since 2021.",
  url: resolveSiteUrl(),
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
