import { useEffect, useState } from "react";

import { getPracticeTestDetail } from "@/services/practice_test";
import { useRouter, useSearchParams } from "next/navigation";

import { usePracticeTestResult } from "@/store/practiceTestStore";

interface PracticeTestData {
  practice_test_id: string;
  practice_test_name: string;
  author_avatar_url: string;
  author_username: string;
}

interface QuestionData {
  question_id: string;
  question_text: string;
  question_type: string;
}

interface AnswerOption {
  option_id: string;
  option_text: string;
  is_correct: boolean;
}

interface PracticeTestQuestionData {
  question: QuestionData;
  answer_option: AnswerOption[];
}

interface PracticeTestDetailData {
  // response
  practice_test: PracticeTestData;
  questions: PracticeTestQuestionData[];
}

interface QuestionSelectedData {
  [key: number]: AnswerOption;
}

export default function useTakePracticeTest() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [practiceTest, setPracticeTest] = useState<PracticeTestData>();
  const [questions, setQuestions] = useState<PracticeTestQuestionData[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<
    PracticeTestQuestionData[]
  >([]);
  const [timer, setTimer] = useState<number>(0);
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<QuestionSelectedData>(
    {}
  );

  const setPracticeTestResult = usePracticeTestResult(
    (state) => state.setPracticeTestResult
  );

  const shuffle = (array: Array<any>) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleOptionSelected = (
    questionIndex: number,
    option: AnswerOption
  ) => {
    if (
      selectedOption[questionIndex] &&
      selectedOption[questionIndex].option_id === option.option_id
    ) {
      const newSelectedOption = { ...selectedOption };
      delete newSelectedOption[questionIndex];
      setSelectedOption(newSelectedOption);
    } else {
      setSelectedOption((prev) => ({
        ...prev,
        [questionIndex]: option,
      }));
    }
  };

  const handleSubmitTestClick = () => {
    if (!practiceTest || !questions || !shuffledQuestions) return;
    const courseId = searchParams.get("uuid");

    let score = 0;
    Object.values(selectedOption).forEach((value) => {
      value.is_correct && score++;
    });
    setPracticeTestResult(
      score,
      practiceTest,
      shuffledQuestions,
      selectedOption
    );
    router.push(`/practice-test/result?uuid=${courseId}`);
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

  const handleCloseBtnClick = (practiceTestName: string) => {
    const practiceTestId = searchParams.get("uuid");
    const practiceTestNameArr = practiceTestName
      .replace(/[^a-zA-z0-1\s]/g, "")
      .split(" ");

    // Tạo slug URL
    let slugArr: Array<any> = [];
    practiceTestNameArr.forEach((word: string) => {
      if (word) {
        slugArr.push(word);
      }
    });
    const slug = slugArr.join("-");

    // Điều hướng sang xem chi tiết học phần
    const newPathname = `/practice-test/${slug}?uuid=${practiceTestId}`;
    router.push(newPathname);
  };

  useEffect(() => {
    const fetchData = async () => {
      const practiceTestId = searchParams.get("uuid");
      if (!practiceTestId) return;

      const response: PracticeTestDetailData = await getPracticeTestDetail(
        practiceTestId
      );

      if (response) {
        setPracticeTest(response.practice_test);
        setQuestions(response.questions);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const shuffleQuestionOptions: PracticeTestQuestionData[] = questions.map(
      (ques) => {
        const question = ques.question;
        const options = shuffle(ques.answer_option);
        return {
          question: question,
          answer_option: options,
        };
      }
    );
    setShuffledQuestions(shuffle(shuffleQuestionOptions));
  }, [questions]);

  useEffect(() => {
    const timer = searchParams.get("timer");
    if (timer) {
      setIsTimeOut(false);
      setTimer(Number(timer) * 60);
    }
  }, []);

  useEffect(() => {
    if (isTimeOut) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          setIsTimeOut(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    practiceTest,
    questions,
    shuffledQuestions,
    timer,
    isTimeOut,
    selectedOption,
    handleCloseBtnClick,
    handleOptionSelected,
    handleSidebarClick,
    handleSubmitTestClick,
  };
}
