export interface CourseModule {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: string;
  skillsAcquired: string[];
  suggestedPrompt: string; // The prompt template the user can use as a co-studying buddy
}

export interface CertificationTrack {
  id: string;
  name: string;
  provider: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  globalDemand: string;
  colorTheme: "pink" | "cyan" | "purple" | "amber" | "emerald";
  modules: CourseModule[];
}

export interface CareerPath {
  id: string;
  title: string;
  roleType: string;
  averageIncome: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  skillsNeeded: string[];
  description: string;
  steps30Days: string;
  steps60Days: string;
  steps90Days: string;
  practicalProject: {
    title: string;
    description: string;
    instructions: string[];
    starterPrompt: string;
  };
}

export interface SavedNote {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: "study" | "career" | "freelance" | "consulting";
  systemPrompt: string;
  placeholderText: string;
}
