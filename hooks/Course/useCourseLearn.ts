import { useEffect, useState } from "react";
import { getCourseLearnQuestions } from "@/services/course";
import { useSearchParams } from "next/navigation";
import useFlashcard from "./useCourseFlashcard";

interface QuestionData {
  course_detail_id: string;
  term: string;
  definition: string;
}

interface OptionsData {
  course_detail_id: string;
  term: string;
  definition: string;
}

interface QuestionsData {
  question: QuestionData;
  options: OptionsData[];
}

interface CourseData {
  course_id: string;
  course_name: string;
  author_avatar_url: string;
  author_username: string;
  author_role: string;
  num_of_terms: number;
}

interface CourseLearnQUestion {
  course: CourseData;
  questions: QuestionsData[];
}

export default function useCourseLearn() {
  const { handleCloseBtnClick } = useFlashcard();
  const searchParams = useSearchParams();

  const [learnQuestions, setLearnQuestions] =
    useState<CourseLearnQUestion | null>(null);
  const [course, setCourse] = useState<CourseData | null>(null);
  const [questions, setQuestions] = useState<QuestionsData[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<OptionsData[]>([]);
  const [incorrectTerms, setIncorrectTerms] = useState<QuestionsData[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [noti, setNoti] = useState<string | null>(null);

  const shuffle = (array: OptionsData[] | QuestionsData[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffleQuestionOptions = (
    questionIndex: number,
    questions: QuestionsData[]
  ) => {
    const question = questions[questionIndex];
    const options = question.options;

    const shuffledQuestions = shuffle([question.question, ...options]);
    return shuffledQuestions;
  };

  const handleOptionSelected = (option_id: string, correct_id: string) => {
    setSelectedOption(option_id);
    if (course && questions) {
      if (currentQuestionIndex < questions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }, 1000);
      } else {
        setIsDone(true);
      }

      if (option_id !== correct_id) {
        setIncorrectTerms((prev) => [...prev, questions[currentQuestionIndex]]);
      }
    }
  };

  const handlePromptOption = (option: boolean) => {
    setShowPrompt(false);
    setIsDone(false);
    if (option) {
      setQuestions(incorrectTerms);
      setCurrentQuestionIndex(0);
      setIncorrectTerms([]);
    } else {
      if (course) {
        handleCloseBtnClick(course?.course_name);
      }
    }
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      const courseId = searchParams.get("uuid");
      if (!courseId) return;

      try {
        const response = await getCourseLearnQuestions(courseId);
        setLearnQuestions(response);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuestion();
  }, []);

  useEffect(() => {
    if (!learnQuestions) return;
    setCourse(learnQuestions.course);
    setQuestions(shuffle(learnQuestions.questions) as QuestionsData[]);
  }, [learnQuestions]);

  useEffect(() => {
    setSelectedOption(null);

    if (course && questions) {
      const shuffledQuestions = shuffleQuestionOptions(
        currentQuestionIndex,
        questions
      );
      setCurrentQuestion(shuffledQuestions as OptionsData[]);
    }
  }, [currentQuestionIndex, course, questions]);

  useEffect(() => {
    if (!questions) return;

    if (isDone) {
      if (incorrectTerms.length > 0) {
        setShowPrompt(true);
      } else {
        setNoti("Chúc mừng! Bạn đã hoàn thành bài học với kết quả tuyệt đối.");
      }
    }
  }, [incorrectTerms, currentQuestionIndex, isDone]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNoti(null);
      if (course) handleCloseBtnClick(course?.course_name);
    }, 2000);

    return () => clearTimeout(timer);
  }, [noti]);

  return {
    course,
    questions,
    currentQuestionIndex,
    currentQuestion,
    selectedOption,
    showPrompt,
    noti,
    handleCloseBtnClick,
    handlePromptOption,
    handleOptionSelected,
  };
}
