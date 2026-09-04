import type { TechnologyDomain } from '@/types';

/** Domains and descriptions as published by Tekton, capability lists expanded. */
export const technologyDomains: TechnologyDomain[] = [
  {
    slug: 'servicenow',
    category: 'Platform',
    name: 'ServiceNow',
    summary: 'Specialised talent for ITSM, ITOM and custom workflow automation.',
    capabilities: ['ITSM', 'ITOM', 'Workflow automation', 'Platform administration', 'Integrations'],
  },
  {
    slug: 'sap',
    category: 'Enterprise',
    name: 'SAP',
    summary: 'Experts in S/4HANA, Fiori and specialised module implementations.',
    capabilities: ['S/4HANA', 'Fiori', 'Functional modules', 'ABAP', 'Migration programmes'],
  },
  {
    slug: 'cybersecurity',
    category: 'Security',
    name: 'Cybersecurity',
    summary: 'Securing digital assets through skilled SOC and threat intelligence talent.',
    capabilities: ['SOC operations', 'Threat intelligence', 'Identity and access', 'GRC', 'Incident response'],
  },
  {
    slug: 'cloud-infrastructure',
    category: 'Infrastructure',
    name: 'Cloud infrastructure',
    summary: 'Accelerating migration with Azure, AWS and hybrid cloud experts.',
    capabilities: ['AWS', 'Azure', 'Hybrid cloud', 'Platform engineering', 'Site reliability'],
  },
  {
    slug: 'ai-machine-learning',
    category: 'Innovation',
    name: 'AI & machine learning',
    summary: 'Specialised professionals focused on LLMs, data science and AI ethics.',
    capabilities: ['LLM engineering', 'Data science', 'MLOps', 'AI ethics and governance', 'Analytics'],
  },
  {
    slug: 'salesforce',
    category: 'CRM',
    name: 'Salesforce',
    summary: 'Certified developers and consultants for seamless CRM transformations.',
    capabilities: ['Certified developers', 'CRM consulting', 'Sales and Service Cloud', 'Integrations', 'Enterprise rollout'],
  },
];
