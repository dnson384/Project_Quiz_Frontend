"use client";
import CourseCard from "@/components/course_card";
import PracticeTestCard from "@/components/practice_test_card";

interface AllResultData {
  courses: Array<any>;
  practiceTests: Array<any>;
  handleViewAllResult: (type: string) => void;
}

export default function AllResult({
  courses,
  practiceTests,
  handleViewAllResult,
}: AllResultData) {
  console.log(courses)
  return (
    <>
      {/* Học phần */}
      {courses && (
        <div>
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold">Học phần</h3>
            {courses.length >= 6 && (
              <h3
                className="text-indigo-500 font-bold cursor-pointer hover:text-indigo-700"
                onClick={() => handleViewAllResult("courses")}
              >
                Xem tất cả
              </h3>
            )}
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-6">
            {courses.slice(0, 6).map((course) => (
              <CourseCard
                key={course.course_id}
                courseId={course.course_id}
                courseName={course.course_name}
                termCount={course.num_of_terms}
                authorName={course.author_username}
                authorRole={course.author_role}
              />
            ))}
          </div>
        </div>
      )}

      {/* Bài kiểm tra */}
      {practiceTests && (
        <div>
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-bold">Bài kiểm tra thử</h3>
            {practiceTests.length > 6 && (
              <h3
                className="text-indigo-500 font-bold cursor-pointer hover:text-indigo-700"
                onClick={() => handleViewAllResult("practice_tests")}
              >
                Xem tất cả
              </h3>
            )}
          </div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-6">
            {practiceTests.slice(0, 6).map((practiceTest) => (
              <PracticeTestCard
                key={practiceTest.practice_test_id}
                practiceTestName={practiceTest.practice_test_name}
                authorName={practiceTest.author_username}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
