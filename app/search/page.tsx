"use client";
import Header from "@/components/header";
import SideMenu from "@/components/side_menu";
import useSearch from "@/hooks/useSearch";

import AllResult from "./all_result";
import CourseResult from "./coure_result";
import PracticeTestResult from "./practice_test_result";

export default function Search() {
  const {
    keyword,
    type,
    courses,
    practiceTests,
    notification,
    HandlerShowResult,
    handleLoadMoreResults,
    handleViewAllResult,
  } = useSearch();

  return (
    <>
      <Header />
      <div className="flex">
        <SideMenu />

        <section className="mx-auto py-3 flex flex-col gap-10">
          <h2 className="text-2xl font-bold">Kết quả cho "{keyword}"</h2>
          <div>
            <div className="flex gap-6">
              <h3
                id="all"
                className={`${
                  type === "all"
                    ? "border-b-2 border-indigo-500"
                    : "text-gray-500"
                } text-sm font-bold pb-2 cursor-pointer`}
                onClick={(e) => HandlerShowResult(e, type)}
              >
                Tẩt cả kết quả
              </h3>
              <h3
                id="courses"
                className={`${
                  type === "courses"
                    ? "border-b-2 border-indigo-500"
                    : "text-gray-500"
                } text-sm font-bold pb-2 cursor-pointer`}
                onClick={(e) => HandlerShowResult(e, type)}
              >
                Học phần
              </h3>
              <h3
                id="practice_tests"
                className={`${
                  type === "practice_tests"
                    ? "border-b-2 border-indigo-500"
                    : "text-gray-500"
                } text-sm font-bold pb-2 cursor-pointer`}
                onClick={(e) => HandlerShowResult(e, type)}
              >
                Bài kiểm tra thử
              </h3>
              <h3
                id="textbooks"
                className={`${
                  type === "textbooks"
                    ? "border-b-2 border-indigo-500"
                    : "text-gray-500"
                } text-sm font-bold pb-2 cursor-pointer`}
                onClick={(e) => HandlerShowResult(e, type)}
              >
                Sách giáo khoa
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-x-4 border border-gray-200">
              <div className="w-xs"></div>
              <div className="w-xs"></div>
              <div className="w-xs"></div>
            </div>
          </div>

          {/* Show all */}
          {type === "all" && (
            <AllResult
              courses={courses}
              practiceTests={practiceTests}
              handleViewAllResult={handleViewAllResult}
            />
          )}

          {/* Courses */}
          {type === "courses" && (
            <CourseResult
              courses={courses}
              handleLoadMoreResults={handleLoadMoreResults}
              notification={notification}
            />
          )}

          {/* Practice Test */}
          {type === "practice_tests" && (
            <PracticeTestResult
              practiceTests={practiceTests}
              // handleLoadMoreResults={handleLoadMoreResults}
              // notification={notification}
            />
          )}
        </section>
      </div>
    </>
  );
}
