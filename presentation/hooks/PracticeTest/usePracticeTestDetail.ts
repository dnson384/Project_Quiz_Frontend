import React, { useEffect, useState } from "react";

import { getPracticeTestDetail } from "@/presentation/services/practice_test.service";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PracticeTest,
  PracticeTestDetail,
  PracticeTestQuestions,
} from "@/domain/entities/PracticeTest";

export default function usePracticeTestDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [baseInfo, setBaseInfo] = useState<PracticeTest | null>(null);
  const [questions, setQuestions] = useState<PracticeTestQuestions[]>([]);
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

      const data: PracticeTestDetail = await getPracticeTestDetail(
        practiceTestId
      );

      if (data) {
        setBaseInfo(data.baseInfo);
        setQuestions(data.questions);
      }
    };
    fetchData();
  }, []);
  return { baseInfo, questions, handleFormSubmit, handleFormInputChange };
}
