import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  PracticeTestQuestions,
  QuestionOption,
} from "@/domain/entities/PracticeTest";

import usePracticeTestDetail from "./usePracticeTestDetail";
import { shuffleArray } from "@/presentation/utils/arrayHelpers";
import { usePracticeTestResult } from "@/presentation/store/practiceTestStore";
import { generateSlug } from "@/presentation/utils/textFormatter";

interface QuestionSelectedData {
  [key: number]: QuestionOption;
}

export default function useTakePracticeTest() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { baseInfo, questions } = usePracticeTestDetail();
  const [shuffledQuestions, setShuffledQuestions] = useState<
    PracticeTestQuestions[]
  >([]);

  const [timer, setTimer] = useState<number>(0);
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] =
    useState<QuestionSelectedData>({});

  const setPracticeTestResult = usePracticeTestResult(
    (state) => state.setPracticeTestResult
  );

  useEffect(() => {
    const shuffleQuestionOptions: PracticeTestQuestions[] = questions.map(
      (ques) => {
        const question = ques.question;
        const options = shuffleArray(ques.options);
        return {
          question: question,
          options: options,
        };
      }
    );
    setShuffledQuestions(shuffleArray(shuffleQuestionOptions));
  }, [questions]);

  const handleOptionSelected = (
    questionIndex: number,
    option: QuestionOption
  ) => {
    if (
      selectedOptionId[questionIndex] &&
      selectedOptionId[questionIndex].id === option.id
    ) {
      const newSelectedOptionId = { ...selectedOptionId };
      delete newSelectedOptionId[questionIndex];
      setSelectedOptionId(newSelectedOptionId);
    } else {
      setSelectedOptionId((prev) => ({
        ...prev,
        [questionIndex]: option,
      }));
    }
  };

  const handleSubmitTestClick = () => {
    if (!baseInfo || !shuffledQuestions) return;
    const courseId = searchParams.get("uuid");

    let score = 0;
    Object.values(selectedOptionId).forEach((value) => {
      value.isCorrect && score++;
    });
    setPracticeTestResult(score, baseInfo, shuffledQuestions, selectedOptionId);
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

  const handleClose = () => {
    const practiceTestId = searchParams.get("uuid");
    if (!baseInfo) return;
    const slug = generateSlug(baseInfo?.name);
    router.push(`/practice-test/${slug}?uuid=${practiceTestId}`);
  };

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
    baseInfo,
    questions,
    shuffledQuestions,
    timer,
    isTimeOut,
    selectedOptionId,
    handleClose,
    handleOptionSelected,
    handleSidebarClick,
    handleSubmitTestClick,
  };
}
