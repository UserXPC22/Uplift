
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Remote' | 'Intern';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  additionalLevels?: string[]; 
  essentialSkills?: string[];
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
  createdAt: number; // New: Timestamp for sorting
  logo: string;
  applyLink: string;
}

export interface UserProfile {
  name: string;
  email: string;
  title: string;
  bio: string;
  createdAt: string;
  recentlyViewedIds: string[];
}
