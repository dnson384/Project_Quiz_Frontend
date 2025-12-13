export interface PracticeTest {
  readonly id: string;
  name: string;
  authorAvatar: string;
  authorName: string;
}

export interface Question {
  id: string;
  text: string;
  type: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface PracticeTestQuestions {
  question: Question;
  options: QuestionOption[];
}

export interface PracticeTestDetail {
  baseInfo: PracticeTest;
  questions: PracticeTestQuestions[];
}

// New
export interface NewBaseInfo {
  name: string;
}

export interface QuestionBase {
  text: string;
  type: string;
}

export interface Option {
  text: string;
  isCorrect: boolean;
}

export interface NewQuestion {
  questionBase: QuestionBase;
  options: Option[];
}

export interface NewPracticeTest {
  baseInfo: NewBaseInfo;
  questions: NewQuestion[];
}
