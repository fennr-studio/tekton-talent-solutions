import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';
import { Leadership } from '@/components/sections/Leadership';
import { FinalCta } from '@/components/sections/FinalCta';

export const metadata: Metadata = pageMetadata({
  title: 'Leadership',
  description:
    'Saikarthik NCH, CEO, and Harika NCH, Director — the leadership team behind Tekton Talent Solutions in Hyderabad.',
  path: '/leadership',
  keywords: ['Tekton leadership', 'Saikarthik NCH', 'Harika NCH', 'IT recruitment leadership India'],
});

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        marker="Leadership"
        lines={['The people', 'accountable', 'for the work.']}
        fills={[0.55, 0.62, 1]}
        lede="Tekton is led by a recruitment strategist and a trainer. That pairing explains a lot about how the company screens candidates and how it supports them afterwards."
      />
      <Leadership detailed />
      <FinalCta />
    </>
  );
}
