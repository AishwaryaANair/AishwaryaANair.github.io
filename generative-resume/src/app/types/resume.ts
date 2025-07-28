export interface ResumeContent {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    location: string;
    linkedin?: string;
    github?: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    location: string;
    achievements: string[];
    technologies: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    year: string;
    gpa?: string;
    honors?: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    highlights: string[];
    githubUrl?: string;
    liveUrl?: string;
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
}

export interface ThemeRequest {
  userPrompt: string;
  timestamp: Date;
}

export interface ThemedResumeResult {
  id: string;
  theme: string;
  htmlContent: string;
  cssContent: string;
  jsContent?: string;
  userPrompt: string;
  createdAt: Date;
  isSecure: boolean;
}

export type ThemeStatus =
  | "idle"
  | "generating"
  | "success"
  | "error"
  | "security_violation";

export interface ThemeState {
  status: ThemeStatus;
  result?: ThemedResumeResult;
  error?: string;
  progress?: number;
}
