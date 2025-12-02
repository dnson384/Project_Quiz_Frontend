"use client";
import PracticeTestQuestion from "@/presentation/components/PracticeTest/practiceTestQuestion";
import useTakePracticeTest from "@/presentation/hooks/PracticeTest/useTakePracticeTest";

export default function TakePracticeTest() {
  const {
    baseInfo,
    shuffledQuestions,
    timer,
    selectedOptionId,
    handleClose,
    handleOptionSelected,
    handleSidebarClick,
    handleSubmitTestClick,
  } = useTakePracticeTest();

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
  const seconds = String(timer % 60).padStart(2, "0");
  return (
    <main>
      {baseInfo && shuffledQuestions.length > 0 && (
        <>
          <header className="fixed z-50 top-0 w-screen py-2 px-5 grid grid-cols-3 bg-white/70 backdrop-blur-md shadow-xs">
            <div className="flex justify-start items-center p-2">
              <p className="font-bold">{baseInfo.name}</p>
            </div>
            <div className="flex justify-center items-center p-2">
              <p className="text-red-500 font-bold text-lg">
                {minutes}:{seconds}
              </p>
            </div>
            <div className="flex justify-end items-center">
              <div
                className="p-2 rounded-full hover:bg-gray-200 "
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
            </div>
          </header>

          <section className="mt-15 py-10 w-4xl mx-auto flex flex-col gap-4">
            {shuffledQuestions.map((question, index) => {
              return (
                <div key={question.question.id} id={`question-${index}`}>
                  <PracticeTestQuestion
                    questionIndex={index}
                    questionText={question.question.text}
                    answerOptions={question.options}
                    handleOptionSelected={handleOptionSelected}
                  />
                </div>
              );
            })}
          </section>

          <aside className="fixed inset-0 top-20 left-5 w-fit h-fit">
            <div className="grid grid-cols-4 gap-2 select-none cursor-pointer">
              {shuffledQuestions.map((question, index) => {
                return (
                  <div
                    key={question.question.id}
                    className={`w-8 h-8 text-sm p-2 ${
                      selectedOptionId[index]
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-200"
                    } rounded-full flex justify-center items-center`}
                    onClick={() => handleSidebarClick(index)}
                  >
                    {index + 1}
                  </div>
                );
              })}
            </div>

            <div className="my-5 flex justify-center">
              <button
                className="px-5 py-3 rounded-full bg-indigo-50 font-medium cursor-pointer hover:bg-indigo-500 hover:text-white"
                onClick={handleSubmitTestClick}
              >
                Gửi bài kiểm tra
              </button>
            </div>
          </aside>
        </>
      )}
    </main>
  );
}
