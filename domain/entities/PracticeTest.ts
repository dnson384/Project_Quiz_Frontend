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

// Update
export interface UpdateBaseInfo {
  name: string;
}

export interface UpdateQuestionBase {
  text: string;
  type: string;
}

export interface UpdateOption {
  id: string | null;
  tempId?: string;
  text: string;
  isCorrect: boolean;
}

export interface UpdateQuestion {
  id: string | null;
  tempId?: string;
  question: UpdateQuestionBase;
  options: UpdateOption[];
}

export interface UpdatePracticeTest {
  baseInfo?: UpdateBaseInfo;
  questions: UpdateQuestion[];
}
