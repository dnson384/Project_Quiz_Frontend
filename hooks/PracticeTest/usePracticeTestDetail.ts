import React, { useEffect, useState } from "react";

import { getPracticeTestDetail } from "@/services/practice_test";
import { useRouter, useSearchParams } from "next/navigation";

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

export default function usePracticeTestDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [practiceTest, setPracticeTest] = useState<PracticeTestData | null>(
    null
  );
  const [questions, setQuestions] = useState<PracticeTestQuestionData[]>([]);
  const [formData, setFormData] = useState({
    num_of_ques: "20",
    timer: "30",
  });

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.num_of_ques || !formData.timer) return;

    const practiceTestId = searchParams.get("uuid");
    router.push(
      `/practice-test/test?uuid=${practiceTestId}&num_of_ques=${formData.num_of_ques}&timer=${formData.timer}`
    );
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
  return { practiceTest, questions, handleFormSubmit, handleFormInputChange };
}
