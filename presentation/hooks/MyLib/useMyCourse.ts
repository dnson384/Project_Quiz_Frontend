"use client";
import {
  Course,
  CourseDetail,
  Term,
  UpdateBaseInfo,
  UpdateCourse,
  UpdateTerm,
} from "@/domain/entities/Course";
import { useAuthContext } from "@/presentation/context/authContext";
import {
  getUserCoures,
  getCourseDetail,
} from "@/presentation/services/course.service";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function useMyCourse() {
  const { user } = useAuthContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Raw data
  const [baseInfo, setBaseInfo] = useState<Course>();
  const [terms, setTerms] = useState<Term[]>([]);

  // Changed data
  const [changedName, setChangedName] = useState<UpdateBaseInfo>();
  const [changedTerms, setChangedTerms] = useState<UpdateTerm[]>([]);

  // UI
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Card Behavior
  const handleDeleteCard = (index: number, id: string | null) => {
    setTerms((prev) => {
      const newTerms = [...prev];
      if (id === null || newTerms[index].id === id) {
        newTerms.splice(index, 1);
      }
      return newTerms;
    });
  };

  const handleAddCard = () => {
    setTerms((prev) => {
      const newTerms = [...prev];
      newTerms.push({ id: null, term: "", definition: "" });
      return newTerms;
    });
  };

  // Input Change
  const handleBaseInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubmitted(false);

    const target = event.target;
    const { name, value } = target;
    setChangedName((prev) => ({ ...prev, [name]: value }));
  };

  const handleTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string | null,
    index: number
  ) => {
    setIsSubmitted(false);

    const target = event.target;
    const { name, value } = target;

    setChangedTerms((prev) => {
      const newChangedTerms = [...prev];
      if (terms[index].id !== id) return prev;

      let currentIndex = newChangedTerms.findIndex(
        (changedTerm) => changedTerm.id === id
      );

      if (currentIndex < 0) {
        newChangedTerms.push({
          id: id,
          term: terms[index].term,
          definition: terms[index].definition,
        });
        currentIndex = newChangedTerms.length - 1;
      }

      newChangedTerms[currentIndex] = {
        ...newChangedTerms[currentIndex],
        [name]: value,
      };
      return newChangedTerms;
    });
  };

  // Save
  const handleSaveChange = (valid: boolean) => {
    setIsSubmitted(true);
    if (valid) {
      const updateCourseData: UpdateCourse = {
        ...(changedName && { course: changedName }),
        details: changedTerms,
      };
      console.log(updateCourseData);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchCourseData = async () => {
      const courseId = searchParams.get("course-id");
      if (!courseId) return;

      const userCourses = await getUserCoures();
      if (!userCourses.some((course) => course.id === courseId)) {
        router.push("/dashboard");
        return;
      }

      const response: CourseDetail = await getCourseDetail(courseId);
      if (response) {
        setBaseInfo(response.baseInfo);
        setTerms(response.terms);
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [user]);

  return {
    // Data
    baseInfo,
    terms,
    changedName,
    changedTerms,
    // UI
    isLoading,
    isSubmitted,
    // Card Behavior
    handleDeleteCard,
    handleAddCard,
    // Input Change
    handleBaseInfoChange,
    handleTermChange,
    // Save
    handleSaveChange,
  };
}
