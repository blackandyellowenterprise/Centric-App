// Student Profile Types
export interface StudentProfile {
  id: string;
  name: string;
  gradeLevel: string;
  interests: string[];
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
  performanceLevel: 'below' | 'at' | 'above';
  strengths: string[];
  challenges: string[];
  completedLessons: string[];
  assessmentHistory: Assessment[];
  lastActive: Date;
}

// Assessment Types
export interface Assessment {
  id: string;
  date: Date;
  subject: string;
  topic: string;
  type: 'quiz' | 'assignment' | 'project' | 'discussion';
  score?: number;
  feedback: string;
  submitted?: File | string;
  gradedBy: 'ai' | 'manual';
}

// Curriculum Types (Texas TEKS)
export interface TEKSStandard {
  itemType: string;
  sequence: string;
  humanCode: string;
  fullStatement: string;
  edLevel: string;
  lastModified: string;
}

export interface CurriculumTopic {
  id: string;
  subject: string;
  chapter: string;
  gradeLevel: string;
  standards: TEKSStandard[];
  prerequisites: string[];
}

// Virtual Teacher Types
export interface TeacherMessage {
  role: 'teacher' | 'student';
  content: string;
  timestamp: Date;
  audioUrl?: string;
  type: 'lecture' | 'guidance' | 'question' | 'feedback' | 'assessment';
}

export interface LessonContext {
  currentTopic: CurriculumTopic;
  studentProfile: StudentProfile;
  conversationHistory: TeacherMessage[];
  lessonObjectives: string[];
  progressPercentage: number;
}

// Voice Settings
export interface VoiceSettings {
  enabled: boolean;
  rate: number;
  pitch: number;
  voice?: SpeechSynthesisVoice;
}
