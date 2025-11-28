"use client";
import Header from "@/components/header";
import SideMenu from "@/components/side_menu";
import useDashboard from "@/hooks/useDashboard";
import CourseCard from "@/components/course_card";
import PracticeTestCard from "@/components/practice_test_card";

export default function Dashboard() {
  const { courseSample, practiceTestSample } = useDashboard();

  return (
    <>
      <Header />
      <div className="flex">
        <SideMenu />

        <section className="mx-auto mt-3 flex flex-col gap-8">
          {courseSample.length > 0 && (
            <div>
              <h3 className="font-bold mb-5">Học phần phổ biến</h3>
              <div className="grid grid-cols-3 gap-x-4">
                {courseSample.map((course) => (
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

          {practiceTestSample.length > 0 && (
            <div className="mx-auto">
              <h3 className="font-bold mb-5">Bài kiểm tra thử phổ biến</h3>
              <div className="grid grid-cols-3 gap-x-4">
                {practiceTestSample.map((test) => (
                  <PracticeTestCard
                    key={test.practice_test_id}
                    practiceTestId={test.practice_test_id}
                    practiceTestName={test.practice_test_name}  
                    authorName={test.author_username}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
