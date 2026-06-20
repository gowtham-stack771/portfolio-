export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Frontend' | 'Full-Stack' | 'Mobile' | 'Design / UI/UX';
  tags: string[];
  features: string[];
  imageUrl: string;
  liveUrl?: string; // e.g. self-preview URL or dummy links
  githubUrl?: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'Frontend' | 'Backend' | 'Tools & Cloud' | 'UI/UX & Soft Skills';
  color: string; // Tailwind color class or hex
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string; // e.g., "2021 - 2025"
  gpa?: string;
  description: string;
  achievements: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  bullets: string[];
}
