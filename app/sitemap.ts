import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

const routes: Array<{ path: string; priority: number; changeFrequency: 'monthly' | 'yearly' }> = [
  { path: '', priority: 1, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/expertise', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/women-and-work', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/leadership', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/careers', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
