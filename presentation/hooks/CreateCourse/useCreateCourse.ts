"use client";
import React, { useState, useEffect } from "react";
import { NewTerm, NewBaseInfo, NewCourse } from "@/domain/entities/Course";

export default function useCreateCoures() {
  const [termCount, setTermCount] = useState<number>(2);
  const [baseInfo, setBaseInfo] = useState<NewBaseInfo>({ name: "" });
  const [termData, setTermData] = useState<NewTerm[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleAddCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSubmitted(false);
    setTermCount((prev) => prev + 1);
  };

  const handleDeleteCard = (index: number) => {
    setIsSubmitted(false);
    if (termCount > 2 && termData.length > 2) {
      setTermCount((prev) => prev - 1);
      setTermData((prev) => {
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

  const handleTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setIsSubmitted(false);
    const { name, value } = event.target;
    setTermData((prev) => {
      const newData = [...prev];

      while (index >= newData.length)
        newData.push({ term: null, definition: null });

      newData[index] = {
        ...newData[index],
        [name]: value,
      };
      return newData;
    });
  };

  const handleCreateClick = (missing: boolean) => {
    setIsSubmitted(true);
    console.log(missing);
    console.log(baseInfo);
    console.log(termData);
  };

  return {
    // UI
    termCount,
    isSubmitted,
    // FieldData
    termData,
    baseInfo,
    // Card
    handleAddCartClick,
    handleDeleteCard,
    // Input
    handleTermChange,
    handleBaseInfoChange,
    // Submit
    handleCreateClick,
  };
}
