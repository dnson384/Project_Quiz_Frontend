"use client";
import React, { useState, useEffect } from "react";
import {
  NewBaseInfo,
  QuestionBase,
  Option,
  NewQuestion,
} from "@/domain/entities/PracticeTest";

export default function useCreatePracticeTest() {
  const [questionCount, setQuestionCount] = useState<number>(2);
  const [questionType, setQuestionType] = useState<string>("SINGLE_CHOICE");
  const [baseInfo, setBaseInfo] = useState<NewBaseInfo>({ name: "" });
  const [questionBase, setQuestionBase] = useState<QuestionBase[]>([]);
  const [questionData, setQuestionData] = useState<NewQuestion[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleAddCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSubmitted(false);
    setQuestionCount((prev) => prev + 1);
  };

  const handleDeleteCard = (index: number) => {
    setIsSubmitted(false);
    if (questionCount > 2 && questionData.length > 2) {
      setQuestionCount((prev) => prev - 1);
      setQuestionData((prev) => {
        const newData = [...prev];
        newData.splice(index, 1);
        return newData;
      });
    }
  };

  const handleBaseInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubmitted(false);
    const { value } = event.target;
    setBaseInfo({ name: value });
  };

  const handleQuestionBaseChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    while (index >= questionBase.length) {
      questionBase.push({ text: "", type: "" });
    }
    setQuestionBase((prev) => {
      const newQuestionBase = [...prev];
      newQuestionBase[index] = { ...newQuestionBase[index], [name]: value };
      return newQuestionBase
    });
  };

  const handleTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setIsSubmitted(false);
    const { name, value } = event.target;
    setQuestionData((prev) => {
      const newData = [...prev];

      while (index >= newData.length)
        // newData.push({ term: null, definition: null });

        newData[index] = {
          ...newData[index],
          [name]: value,
        };
      return newData;
    });
  };

  const handleCreateClick = () => {
    setIsSubmitted(true);
    // console.log(missing);
    // console.log(baseInfo);
    // console.log(questionData);
    console.log(questionBase);
  };

  return {
    // UI
    questionCount,
    isSubmitted,
    questionType,
    // FieldData
    questionData,
    baseInfo,
    // Card
    handleAddCartClick,
    handleDeleteCard,
    // Input
    handleTermChange,
    handleBaseInfoChange,
    handleQuestionBaseChange,
    // Submit
    handleCreateClick,
  };
}
