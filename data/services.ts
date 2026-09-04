import type { Service } from '@/types';

/**
 * Source: tektontalentglobal.com service descriptions, expanded with the
 * capability list published on the same site. No claims added.
 */
export const services: Service[] = [
  {
    slug: 'it-recruitment',
    index: '01',
    name: 'IT recruitment',
    summary:
      'Specialised hiring for permanent, contract, contract-to-hire and project-based roles across technology domains.',
    detail:
      'We run technical hiring as a repeatable process rather than a search. Roles are scoped with your engineering leads, sourced against a live PAN India network, screened by specialists who have worked in the domain, and delivered with evidence of technical depth attached to every profile.',
    engagements: ['Permanent (FTE)', 'Contract', 'Contract-to-hire', 'Project-based', 'C2C', 'RPO'],
    deliverables: [
      'Role scoping and calibrated scorecards',
      'Specialist panel screening',
      'Structured interview support',
      'Offer management and joining follow-through',
    ],
  },
  {
    slug: 'technology-consulting',
    index: '02',
    name: 'Technology consulting',
    summary:
      'Advisory and consulting support to align technology capabilities with business goals and digital transformation.',
    detail:
      'Advisory work that starts with the outcome you are accountable for, then works backwards to the platform decisions, delivery model and team shape that get you there. We stay close enough to delivery that the advice survives contact with your roadmap.',
    engagements: ['Advisory retainer', 'Transformation programme', 'Platform assessment'],
    deliverables: [
      'Current-state capability assessment',
      'Target operating and team model',
      'Platform and delivery roadmap',
      'Build, buy and hire recommendations',
    ],
  },
  {
    slug: 'it-services',
    index: '03',
    name: 'IT services',
    summary:
      'Implementation, support and managed services across key enterprise technologies and platforms.',
    detail:
      'Turnkey delivery for the platforms we hire into every day. Teams are assembled from the same vetted network, run to defined quality standards, and can operate onsite, remote or blended across India.',
    engagements: ['Managed service', 'Implementation project', 'Dedicated pod'],
    deliverables: [
      'Implementation and rollout',
      'Application and platform support',
      'Managed operations with agreed service levels',
      'Onsite, remote or blended delivery',
    ],
  },
  {
    slug: 'workforce-solutions',
    index: '04',
    name: 'Workforce solutions',
    summary:
      'Technical upskilling and tailored workforce growth strategies for modern enterprise teams.',
    detail:
      'Capability planning for teams that need to change faster than they can hire. We map the skills you already have, the ones the roadmap demands, and close the gap with a mix of training, redeployment and targeted hiring.',
    engagements: ['Capability programme', 'Upskilling cohort', 'Workforce planning'],
    deliverables: [
      'Skills mapping across existing teams',
      'Upskilling pathways by domain',
      'Redeployment and hiring plan',
      'Progress reporting for leadership',
    ],
  },
  {
    slug: 'contract-staffing',
    index: '05',
    name: 'Contract staffing',
    summary:
      'Flexible technical capacity for fixed-term programmes, seasonal peaks and specialist gaps.',
    detail:
      'Contract engagements handled end to end — sourcing, compliance, onboarding and extension — so programme managers get the capacity they need without adding permanent headcount.',
    engagements: ['Contract', 'Contract-to-hire', 'C2C'],
    deliverables: [
      'Rate-benchmarked shortlists',
      'Compliance and documentation',
      'Onboarding and timesheet coordination',
      'Extension and conversion support',
    ],
  },
  {
    slug: 'technical-training',
    index: '06',
    name: 'Technical training',
    summary:
      'Technical and soft-skills training that prepares people for the roles enterprises are actually hiring for.',
    detail:
      'Training built and led in-house, covering platform skills, interview readiness and the communication skills that decide how far strong engineers get. Run for client teams and for candidates entering our network.',
    engagements: ['Client cohort', 'Candidate readiness programme'],
    deliverables: [
      'Platform and domain training',
      'Soft-skills and communication coaching',
      'Interview and assessment preparation',
      'Professional coaching for team leads',
    ],
  },
];

export const homeServices = services.slice(0, 4);
