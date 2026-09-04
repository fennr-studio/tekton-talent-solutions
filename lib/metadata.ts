import type { Metadata } from 'next';
import { site } from '@/data/site';
import { services } from '@/data/services';

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

/** Builds consistent per-page metadata, canonical URL and social cards. */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: PageMetaInput): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · ${site.name}`,
      description,
    },
  };
}

/** Organization + LocalBusiness structured data. */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}#organization`,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    foundingDate: site.founded,
    description: site.description,
    areaServed: { '@type': 'Country', name: 'India' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: 'IN',
    },
    knowsAbout: [
      'IT recruitment',
      'Technology consulting',
      'Contract staffing',
      'Workforce solutions',
      'ServiceNow',
      'SAP',
      'Cybersecurity',
      'Cloud infrastructure',
      'Artificial intelligence',
      'Salesforce',
    ],
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', name: 'CMMI Level 3' },
      { '@type': 'EducationalOccupationalCredential', name: 'ISO 9001:2015' },
    ],
    sameAs: site.social.map((s) => s.href),
  };
}

export function servicesSchema(items: { name: string; summary: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: item.name,
        description: item.summary,
        provider: { '@id': `${site.url}#organization` },
        areaServed: { '@type': 'Country', name: 'India' },
      },
    })),
  };
}

/**
 * The site-wide services ItemList, built from the same data the pages render.
 * Wrapping it here means the homepage and the services page cannot drift apart
 * in what they claim, and neither has to import the service list to emit it.
 */
export function servicesItemList() {
  return servicesSchema(services);
}
