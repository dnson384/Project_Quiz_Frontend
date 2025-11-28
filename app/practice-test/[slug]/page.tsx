"use client";
import Image from "next/image";

import Header from "@/components/header";
import SideMenu from "@/components/side_menu";

import usePracticeTestDetail from "@/hooks/PracticeTest/usePracticeTestDetail";

export default function PracticeTestDetail() {
  const { practiceTest, questions, handleFormSubmit, handleFormInputChange } =
    usePracticeTestDetail();
  return (
    <>
      <Header />
      <div className="flex">
        <SideMenu />

        <main className="mx-auto">
          <section className="w-3xl flex flex-col gap-5">
            <div>
              <h2 className="text-3xl font-bold mb-3">
                {practiceTest?.practice_test_name}
              </h2>
              <div className="flex items-center gap-2">
                <Image
                  src={`/api/images${practiceTest?.author_avatar_url}`}
                  alt={practiceTest?.practice_test_name || "user avatar"}
                  width={36}
                  height={36}
                  className="w-6 h-6 rounded-full cursor-pointer"
                ></Image>
                <p className="text-gray-700 font-semibold">
                  {practiceTest?.author_username}
                </p>
              </div>
            </div>

            {/* Question Demo */}
            <div>
              <p className="font-semibold mb-3">Câu hỏi ví dụ</p>
              <div>
                {questions.slice(0, 10).map((question, index) => (
                  <div key={question.question.question_id} className="flex">
                    <p className="w-10">{index + 1}.</p>
                    <div>
                      <p>{question.question.question_text}</p>
                      <div>
                        {question.answer_option.map((option) => (
                          <div
                            key={option.option_id}
                            className="flex items-center gap-3"
                          >
                            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                            <p>{option.option_text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="fixed top-40 right-60 px-5 py-7 w-fit h-fit rounded-xl bg-white flex flex-col gap-3">
              <form onSubmit={(e) => handleFormSubmit(e)}>
                <div className="flex flex-col gap-1.5">
                  <label
                    className="font-semibold text-sm text-gray-700"
                    htmlFor="num_of_ques"
                  >
                    Câu hỏi (tối đa {questions.length})
                  </label>
                  <input
                    id="num_of_ques"
                    name="num_of_ques"
                    type="number"
                    className="text-sm w-55 border border-gray-400 rounded-md px-2 py-1 focus:outline-indigo-400"
                    defaultValue="20"
                    onChange={(e) => handleFormInputChange(e)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    className="font-semibold text-sm text-gray-700"
                    htmlFor="timer"
                  >
                    Hẹn giờ (phút)
                  </label>
                  <input
                    id="timer"
                    name="timer"
                    type="number"
                    className="text-sm w-55 border border-gray-400 rounded-md px-2 py-1 focus:outline-indigo-400"
                    defaultValue="30"
                    onChange={(e) => handleFormInputChange(e)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-full mt-3 bg-indigo-500 text-white font-semibold cursor-pointer hover:bg-indigo-700"
                >
                  Triển luôn bạn ei
                </button>
              </form>
            </aside>
          </section>
        </main>
      </div>
    </>
  );
}
