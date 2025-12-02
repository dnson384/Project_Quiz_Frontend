"use client";
import { Course } from "@/domain/entities/Course";
import { PracticeTest } from "@/domain/entities/PracticeTest";
import CourseCard from "@/presentation/components/Course/courseCard";
import PracticeTestCard from "@/presentation/components/PracticeTest/practiceTestCard";

interface AllResultData {
  courses: Course[];
  practiceTests: PracticeTest[];
  handleViewAllResult: (type: string) => void;
}

export default function AllResult({
  courses,
  practiceTests,
  handleViewAllResult,
}: AllResultData) {
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
                key={course.id}
                courseId={course.id}
                courseName={course.name}
                authorAvatarURL={course.authorAvatar}
                authorName={course.authorName}
                authorRole={course.authorRole}
                termCount={course.termCount}
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
                key={practiceTest.id}
                practiceTestId={practiceTest.id}
                practiceTestName={practiceTest.name}
                authorAvatar={practiceTest.authorAvatar}
                authorName={practiceTest.authorName}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
