import { useTestResult } from "../../store/courseTestStore";
import { useEffect, useState } from "react";
import { getCourseTestQuestions } from "@/services/course";
import { useRouter, useSearchParams } from "next/navigation";
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

interface CourseTestQUestion {
  course: CourseData;
  questions: QuestionsData[];
}

interface OptionSelectedData {
  optionId: string;
  correctId: string;
}

interface QuestionSelectedData {
  [key: number]: OptionSelectedData;
}

export default function useCourseTest() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { handleCloseBtnClick } = useFlashcard();
  const setTestResutl = useTestResult((state) => state.setTestResult);

  const [learnQuestions, setLearnQuestions] =
    useState<CourseTestQUestion | null>(null);
  const [course, setCourse] = useState<CourseData | null>(null);
  const [questions, setQuestions] = useState<QuestionsData[] | null>(null);
  const [shuffledQuestions, setShuffledQuestions] = useState<OptionsData[][]>(
    []
  );
  const [selectedOption, setSelectedOption] = useState<QuestionSelectedData>(
    {}
  );

  const shuffle = (array: OptionsData[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const shuffleQuestionOptions = (question: QuestionsData) => {
    const options = question.options;

    const shuffledQuestions = shuffle([question.question, ...options]);
    return shuffledQuestions;
  };

  const handleOptionSelected = (
    questionIndex: number,
    option_id: string,
    correct_id: string
  ) => {
    if (
      selectedOption[questionIndex] &&
      selectedOption[questionIndex].optionId === option_id
    ) {
      const newSelectedOption = { ...selectedOption };
      delete newSelectedOption[questionIndex];
      setSelectedOption(newSelectedOption);
    } else {
      setSelectedOption((prev) => ({
        ...prev,
        [questionIndex]: {
          optionId: option_id,
          correctId: correct_id,
        },
      }));
    }
  };

  const handleSubmitTestClick = () => {
    if (!course || !questions || !shuffledQuestions) return;
    const courseId = searchParams.get("uuid");

    let score = 0;
    Object.values(selectedOption).forEach((value) => {
      value.optionId === value.correctId && score++;
    });
    setTestResutl(score, course, questions, shuffledQuestions, selectedOption);
    router.push(`/course/test/result?uuid=${courseId}`);
  };

  const handleSidebarClick = (index: number) => {
    const element = document.getElementById(`question-${index}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      const courseId = searchParams.get("uuid");
      if (!courseId) return;

      try {
        const response = await getCourseTestQuestions(courseId);
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
    setQuestions(learnQuestions.questions);
  }, [learnQuestions]);

  useEffect(() => {
    const shuffledQuestions = questions?.map((ques) =>
      shuffleQuestionOptions(ques)
    );
    if (shuffledQuestions) setShuffledQuestions(shuffledQuestions);
  }, [questions]);

  return {
    course,
    questions,
    selectedOption,
    shuffledQuestions,
    handleCloseBtnClick,
    handleOptionSelected,
    handleSubmitTestClick,
    handleSidebarClick,
  };
}
