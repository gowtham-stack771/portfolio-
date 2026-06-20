import { Project, Skill, EducationItem, ExperienceItem } from './types';

export const personalInfo = {
  fullName: 'Gowtham K',
  shortTitle: 'Aspiring Software Developer',
  tagline: 'Aspiring Software Developer with knowledge of programming, web development, and software engineering principles.',
  email: 'sskrishnamoorthy2@gmail.com',
  location: 'Chennai, India',
  phone: '7550201936',
  github: 'https://github.com/gowtham-stack771',
  linkedin: 'http://www.linkedin.com/in/gowtham771',
  twitter: 'https://twitter.com',
  aboutLong: `Aspiring Software Developer with knowledge of programming, web development, and software engineering principles. Looking for an opportunity to utilize technical skills and grow in a professional environment.

Passionate about building functional software solutions, analyzing datasets, and learning emerging engineering frameworks.`,
  funStats: [
    { label: 'Education', value: 'B.E CSE' },
    { label: 'Location', value: 'Chennai, India' },
  ],
  languages: ['Tamil', 'English'],
  hobbies: ['Learn New Technologies', 'Coding']
};

export const skillsData: Skill[] = [
  // Backend & Languages
  { name: 'Python', level: 80, category: 'Backend', color: 'rgb(59, 130, 246)', description: 'Application scripting & algorithms' },
  { name: 'MySQL', level: 80, category: 'Backend', color: 'rgb(14, 165, 233)', description: 'Query operations & database schemas' },
  
  // Frontend
  { name: 'HTML & CSS', level: 82, category: 'Frontend', color: 'rgb(6, 182, 212)', description: 'Web development layout structuring' },
  { name: 'Data Visualization', level: 75, category: 'Frontend', color: 'rgb(244, 63, 94)', description: 'Displaying analytical data' },

  // Tools
  { name: 'VS Code', level: 90, category: 'Tools & Cloud', color: 'rgb(234, 179, 8)', description: 'Source code management & workspaces' },
  { name: 'Power BI', level: 60, category: 'Tools & Cloud', color: 'rgb(34, 197, 94)', description: 'Interactive dashboard & reporting' },

  // Analytical
  { name: 'Data Analysis', level: 80, category: 'UI/UX & Soft Skills', color: 'rgb(168, 85, 247)', description: 'Interpreting complex data pools' }
];

export const projectsData: Project[] = [
  {
    id: 'project-1',
    title: 'Movie Recommendation System',
    description: 'Developed a movie recommendation system that suggests movies based on user-selected genres and preferences. Implemented filtering techniques to provide relevant movie recommendations and improve user experiences.',
    category: 'Full-Stack',
    tags: ['Python', 'Flask', 'HTML', 'CSS', 'Recommendation Engine'],
    features: [
      'Interactive interface powered by Python and Flask web server',
      'Provides movie suggestions based on selected genres and user preferences',
      'Implemented custom filtering techniques to provide highly relevant content suggestions',
      'Hosted platform with production accessibility'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800',
    liveUrl: 'http://nextwatch.pythonanywhere.com',
    githubUrl: 'https://github.com/gowtham-stack771',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Automated Traffic Management System',
    description: 'Developed and designed a traffic management system that analyzes vehicle density and adjusts signal lights automatically to improve traffic flow and reduce congestion using Python.',
    category: 'Full-Stack',
    tags: ['Python', 'HTML', 'CSS'],
    features: [
      'Simulates live vehicle density calculations',
      'Proactively modifies signal light timers and sequences to improve city traffic metrics',
      'Light density model and terminal visualization charts',
      'Clean interactive front-end display matching system outputs'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1494783301193-115fa9d3ac02?auto=format&fit=crop&q=80&w=800',
    liveUrl: '#',
    githubUrl: 'https://github.com/gowtham-stack771',
    featured: true,
  }
];

export const educationHistory: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Engineering in Computer Science and Engineering',
    institution: 'Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College, Chennai',
    period: '2024 - 2028',
    gpa: '7.54',
    description: 'Focusing on foundational software principles, data architectures, system analysis, and interactive application design.',
    achievements: [
      'Relevant coursework in Object-Oriented Programming, Data Structures & Algorithms, Design Thinking and Innovation',
      'Academic project: Automated Traffic Management System'
    ]
  },
  {
    id: 'edu-2',
    degree: 'HSC (Mathematics and Computer Science)',
    institution: 'Sri Krishnammal Matric. Hr. Sec. School, Chennai',
    period: '2022 - 2024',
    gpa: '65%',
    description: 'Higher Secondary Certificate focusing on core mathematical principles, physical sciences, and introductory computer programming.',
    achievements: [
      'Top percentile in mathematics and computer science'
    ]
  }
];

export const experienceHistory: ExperienceItem[] = [];

