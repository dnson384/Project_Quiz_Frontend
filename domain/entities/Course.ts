export interface Course {
  readonly id: string;
  name: string;
  authorAvatar: string;
  authorName: string;
  authorRole: string;
  termCount: number;
}

export interface Term {
  readonly id: string;
  term: string;
  definition: string;
}

export interface CourseDetail {
  baseInfo: Course;
  terms: Term[];
}

// Learn
export interface LearnQuestion {
  question: Term;
  options: Term[];
}

export interface CourseLearn {
  baseInfo: Course;
  questions: LearnQuestion[];
}

// Test
export interface TestQuestion {
  question: Term;
  options: Term[];
}
export interface CourseTest {
  baseInfo: Course;
  questions: TestQuestion[];
}
