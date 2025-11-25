"use client";
import Flashcard from "@/components/flashcard";
import LearnMethodDropdown from "@/components/learn_method_dropdown";

import useCourseDetail from "@/hooks/useCourseDetail";
import useFlashcard from "@/hooks/useFlashcard";

import { useEffect } from "react";

export default function CourseDetailTest() {
  const { courseDetail } = useCourseDetail();
  const course = courseDetail?.course;
  const detail = courseDetail?.course_detail;

  const {
    canBack,
    canForward,
    currentTerm,
    rotateX,
    isResetting,
    direction,
    setNumOfTerms,
    handleFlashcardClick,
    handleFlashcardSlider,
    isLatinText,
    handleCloseBtnClick,
  } = useFlashcard();

  useEffect(() => {
    if (!course) return;
    setNumOfTerms(course.num_of_terms);
  }, [course]);

  return (
    <>
      {course && (
        <>
          <header className="py-3 px-5 relative">
            <LearnMethodDropdown />
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold">
                {currentTerm} / {course.num_of_terms}
              </p>
              <p className="font-bold">{course.course_name}</p>
            </div>
            <div
              className="absolute right-3 top-3 p-2 rounded-full hover:bg-gray-200"
              onClick={() => handleCloseBtnClick(course.course_name)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="cursor-pointer"
              >
                <path
                  fill="currentColor"
                  d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"
                />
              </svg>
            </div>
          </header>

          {/* Flashcard */}
          <div className="mx-auto w-[70%] h-max z-0">
            <section className="flex flex-col gap-5">
              {/* Flashcard Demo */}
              {detail && detail.length > 0 ? (
                <Flashcard
                  term={detail[currentTerm - 1].term}
                  definition={detail[currentTerm - 1].definition}
                  currentTerm={currentTerm}
                  num_of_terms={course.num_of_terms}
                  rotateX={rotateX}
                  canBack={canBack}
                  canForward={canForward}
                  isResetting={isResetting}
                  direction={direction}
                  handleFlashcardClick={handleFlashcardClick}
                  handleFlashcardSlider={handleFlashcardSlider}
                  isLatinText={isLatinText}
                />
              ) : (
                <div className="h-[450px] w-full"></div>
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
}
