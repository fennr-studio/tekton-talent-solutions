import type { CultureStory, Standard } from '@/types';

export const standards: Standard[] = [
  {
    kind: 'certification',
    title: 'CMMI Level 3',
    body: 'Appraised at maturity level 3: processes are defined, documented and applied consistently across every engagement rather than reinvented per client.',
  },
  {
    kind: 'certification',
    title: 'ISO 9001:2015',
    body: 'A certified quality management system, IAF accredited, governing how work is planned, reviewed and corrected.',
  },
  {
    kind: 'practice',
    title: 'Operational excellence',
    body: 'Committed to rigorous engineering standards that ensure reliable outcomes for our clients.',
  },
  {
    kind: 'practice',
    title: 'Expert vetting',
    body: 'Every candidate is screened by specialist panels to confirm deep technical proficiency before a profile reaches you.',
  },
  {
    kind: 'practice',
    title: 'Unparalleled scale',
    body: "Access to a vast network of highly skilled technology talent from India's most innovative software hubs.",
  },
  {
    kind: 'practice',
    title: 'Precision recruitment',
    body: 'We use detailed role data and deep industry insight to source talent matched to your specific requirement.',
  },
];

export const cultureStories: CultureStory[] = [
  {
    title: 'Success stories',
    body: 'Client outcomes that reflect the impact of inclusive hiring and dependable technology delivery.',
  },
  {
    title: 'CSR initiative',
    body: 'Meaningful community work aimed at social impact and opportunity across India.',
  },
  {
    title: 'Inclusive culture',
    body: 'Festivals and shared celebrations that keep a distributed team feeling like one team.',
  },
];

/** Core capabilities, verbatim from the source site's About block. */
export const coreCapabilities = [
  'IT recruitment',
  'Contract staffing',
  'Technology consulting',
  'IT services',
  'Technical training',
  'Workforce solutions',
  'PAN India remote and onsite requirements',
];
