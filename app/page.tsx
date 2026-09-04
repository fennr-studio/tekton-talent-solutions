import { Hero } from '@/components/sections/Hero';
import { ImpactStats } from '@/components/sections/ImpactStats';
import { Manifesto } from '@/components/sections/Manifesto';
import { ProcessPinned } from '@/components/sections/ProcessPinned';
import { ServicesEditorial } from '@/components/sections/ServicesEditorial';
import { TechLandscape } from '@/components/sections/TechLandscape';
import { WomenAndWork } from '@/components/sections/WomenAndWork';
import { Leadership } from '@/components/sections/Leadership';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/ui/JsonLd';
import { servicesItemList } from '@/lib/metadata';

/**
 * Homepage rhythm.
 *
 * The order alternates ground and density rather than stacking similar blocks:
 * a light full-viewport hero, a dark ledger of numbers, a light statement, the
 * dark held-word sequence, then services, expertise, the women-and-work story,
 * leadership, and a full-viewport close. No two adjacent sections share both a
 * background and a layout.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={servicesItemList()} />
      <Hero />
      <ImpactStats />
      <Manifesto />
      <ProcessPinned />
      <ServicesEditorial />
      <TechLandscape />
      <WomenAndWork />
      <Leadership />
      <FinalCta />
    </>
  );
}
