"use client";
import LearnMethodDropdown from "@/presentation/components/layout/learn_method_dropdown";
import TestQuestion from "@/presentation/components/Course/testQuestion";

import useCourseTest from "@/presentation/hooks/Course/useCourseTest";

export default function CourseDetailTest() {
  const {
    baseInfo,
    questions,
    selectedOption,
    shuffledQuestionsOptions,
    handleClose,
    handleOptionSelected,
    handleSubmitTestClick,
    handleSidebarClick,
  } = useCourseTest();

  return (
    <>
      {baseInfo && (
        <>
          <header className="py-3 px-5 relative h-18">
            <LearnMethodDropdown />
            <div className="h-full flex justify-center items-center">
              <p className="font-semibold text-lg">{baseInfo.name}</p>
            </div>
            <div
              className="absolute right-5 top-3 p-2 rounded-full hover:bg-gray-200"
              onClick={handleClose}
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

          <section className="flex flex-col gap-5 relative">
            {baseInfo && questions && shuffledQuestionsOptions && (
              <>
                {questions.map((question, index) => {
                  const currentQuestionOptions =
                    shuffledQuestionsOptions[index];
                  return (
                    <div
                      key={question.question.id}
                      id={`question-${index}`}
                      className="scroll-mt-4"
                    >
                      <TestQuestion
                        questionIndex={index}
                        correctAnswer={question.question}
                        currentQuestionOptions={currentQuestionOptions}
                        selectedOption={selectedOption[index]?.optionId || null}
                        handleOptionSelected={handleOptionSelected}
                      />
                    </div>
                  );
                })}
                <aside className="fixed left-5 w-fit grid grid-cols-4 gap-2 select-none cursor-pointer">
                  {questions.map((question, index) => {
                    return (
                      <div
                        key={question.question.id}
                        className={`w-8 h-8 text-sm p-2 ${
                          selectedOption[index]
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-200"
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
                    onClick={handleSubmitTestClick}
                  >
                    Gửi bài kiểm tra
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
