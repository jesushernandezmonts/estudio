export type ViewType = 
  | 'dashboard' 
  | 'diferencial' 
  | 'integral' 
  | 'edos' 
  | 'lab-tangente' 
  | 'lab-riemann' 
  | 'lab-direcciones' 
  | 'lab-libre' 
  | 'quizzes' 
  | 'love-notes';

export interface Lesson {
  id: string;
  title: string;
  badge: string;
  intro: string;
  chidoExplanation: string;
  concept: string;
  formula: string;
  example: string;
  takeaway: string;
}

export interface QuizQuestion {
  question: string;
  formula: string;
  options: string[];
  correct: number;
  hint: string;
}

export interface LoveNote {
  id: number;
  title: string;
  req: string;
  icon: string;
  unlocked: boolean;
  text: string;
}

export interface ProgressMap {
  [lessonId: string]: boolean;
}
