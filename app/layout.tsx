import type { Metadata, Viewport } from 'next';
import { Archivo } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { IntroProvider } from '@/components/layout/Preloader';
import { CursorFollower } from '@/components/animations/CursorFollower';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { JsonLd } from '@/components/ui/JsonLd';
import { organizationSchema } from '@/lib/metadata';
import { seoKeywords, site } from '@/data/site';

/**
 * One family across the whole site. Archivo is a variable font with a width
 * axis, which gives display type its density without a second webfont.
 */
const archivo = Archivo({
  subsets: ['latin'],
  /* The width axis is the whole type system: the display voice is this same
     family at 'wdth' 62, so there is still only one font request for a page
     that appears to use two families. */
  axes: ['wdth'],
  weight: 'variable',
  display: 'swap',
  variable: '--font-archivo',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — technology recruitment and IT services, Hyderabad`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: seoKeywords,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — technology recruitment and IT services`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — technology recruitment and IT services`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'business',
};

export const viewport: Viewport = {
  themeColor: '#0B0B0B',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={archivo.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-veil focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <JsonLd data={organizationSchema()} />
        <SmoothScroll />
        <CursorFollower />
        <IntroProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </IntroProvider>
      </body>
    </html>
  );
}
