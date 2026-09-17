export interface Project {
  id: string;
  title: string;
  category: 'AI' | 'IoT' | 'Software' | 'Cloud' | 'Automation';
  tagline: string;
  description: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  impact: string;
  client: string;
  year: string;
}

export interface InnovationDomain {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  iconName: string;
  color: string;
  bgGradient: string;
  stats: string;
  capabilities: string[];
  researchFocus: string;
}

export interface Milestone {
  year: string;
  quarter?: string;
  title: string;
  description: string;
  badge: string;
  highlight?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  avatar: string;
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar: string;
  rating: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: 'wide' | 'tall' | 'square';
  caption: string;
  date: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

export interface InquiryRecord extends ContactFormData {
  id: string;
  date: string;
  status: 'new' | 'reviewing' | 'resolved' | 'archived';
  starred?: boolean;
  notes?: string;
}
