"use client";
import { useTestResult } from "@/store/courseTestStore";
import useCourseTest from "@/hooks/useCourseTest";

import TestQuestionResult from "@/components/test_question_result";
import LearnMethodDropdown from "@/components/learn_method_dropdown";
import TestScoreChart from "@/components/test_score_chart";

export default function TestResult() {
  const testResult = useTestResult((state) => state.testResult);
  const { score, course, questions, shuffleQuestions, selectedOptions } =
    testResult;
  const { handleCloseBtnClick, handleSidebarClick } = useCourseTest();

  return (
    <>
      {course && (
        <>
          <header className="py-3 px-5 relative h-18">
            <LearnMethodDropdown />
            <div className="h-full flex justify-center items-center">
              <p className="font-semibold text-lg capitalize">{course?.course_name}</p>
            </div>
            <div
              className="absolute right-5 top-3 p-2 rounded-full hover:bg-gray-200"
              onClick={() => {
                if (course) {
                  handleCloseBtnClick(course?.course_name);
                }
              }}
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
          <section className="flex justify-center mb-10">
            <TestScoreChart score={score} total={questions.length} />
          </section>
          <section className="flex flex-col gap-5 relative">
            {course && questions && shuffleQuestions && (
              <>
                {questions.map((question, index) => {
                  const currentQuestion = shuffleQuestions[index];
                  return (
                    <div
                      key={question.question.course_detail_id}
                      id={`question-${index}`}
                      className="scroll-mt-4"
                    >
                      <TestQuestionResult
                        questionIndex={index}
                        correctAnswer={question.question}
                        currentQuestion={currentQuestion}
                        selectedOption={
                          selectedOptions[index]?.optionId || null
                        }
                      />
                    </div>
                  );
                })}
                <aside className="fixed inset-0 top-18 left-5 w-fit h-fit grid grid-cols-4 gap-2 select-none cursor-pointer">
                  {questions.map((question, index) => {
                    let isCorrect = false;
                    if (selectedOptions[index]) {
                      const currentOption = selectedOptions[index];
                      isCorrect =
                        currentOption.correctId === currentOption.optionId;
                    }
                    return (
                      <div
                        key={question.question.course_detail_id}
                        className={`w-8 h-8 text-sm p-2 text-white ${
                          isCorrect ? "bg-teal-500" : "bg-red-400"
                        } rounded-full flex justify-center items-center`}
                        onClick={() => handleSidebarClick(index)}
                      >
                        {index + 1}
                      </div>
                    );
                  })}
                </aside>

                {/* Submit Btn */}
                <div className="my-5 flex justify-center">
                  <button
                    className="px-5 py-3 rounded-full bg-indigo-500 text-white font-bold cursor-pointer hover:bg-indigo-600"
                    onClick={() => handleCloseBtnClick(course.course_name)}
                  >
                    Xem xong thì cút!!!
                  </button>
                </div>
              </>
            )}
          </section>
        </>
      )}
    </>
  );
}
