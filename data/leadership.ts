import type { Leader } from '@/types';

export const leadership: Leader[] = [
  {
    slug: 'saikarthik-nch',
    name: 'Saikarthik NCH',
    role: 'Chief Executive Officer',
    monogram: 'SK',
    // Drop a file at public/images/leadership/saikarthik.jpg and set the path
    // here to replace the generated portrait plate. See public/images/README.md.
    portrait: undefined,
    bio: '15+ years of experience in recruitment and technology. Leads Tekton Talent Solutions with strong expertise in recruitment strategy, technology hiring, workforce planning and business growth.',
    focus: ['Recruitment strategy', 'Technology hiring', 'Workforce planning', 'Business growth'],
    education: ['B.Tech, Computer Science Engineering', 'MBA, Human Resources'],
  },
  {
    slug: 'harika-nch',
    name: 'Harika NCH',
    role: 'Director',
    monogram: 'HN',
    portrait: undefined,
    bio: 'Expert in technical training, soft-skills training, operations, employee development and professional coaching. Drives operational excellence and employee development at Tekton, focusing on building capable teams.',
    focus: ['Technical training', 'Soft-skills training', 'Operations', 'Employee development', 'Professional coaching'],
  },
];
