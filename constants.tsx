
import { Job } from './types';

export const INITIAL_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechFlow',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$140k - $180k',
    description: 'We are looking for a highly skilled React developer to lead our frontend team. You will work on building scalable web architectures and mentoring junior developers.',
    requirements: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
    postedDate: '2 days ago',
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    logo: 'https://picsum.photos/seed/tech/100/100',
    applyLink: 'https://google.com/careers'
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Creative Studio',
    location: 'Remote',
    type: 'Remote',
    salary: '$90k - $120k',
    description: 'Join our design-first agency to craft beautiful user experiences for global startups. You should have a strong portfolio showcasing mobile and web projects.',
    requirements: ['Figma', 'UI/UX Design', 'Prototyping'],
    postedDate: '5 days ago',
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    logo: 'https://picsum.photos/seed/design/100/100',
    applyLink: 'https://figma.com/careers'
  },
  {
    id: '3',
    title: 'Backend Developer (Node.js)',
    company: 'DataScale',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$130k - $160k',
    description: 'Help us scale our real-time data processing engines. You will be responsible for API design and performance optimization.',
    requirements: ['Node.js', 'PostgreSQL', 'Redis', 'AWS'],
    postedDate: '1 week ago',
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
    logo: 'https://picsum.photos/seed/data/100/100',
    applyLink: 'https://stripe.com/jobs'
  }
];
