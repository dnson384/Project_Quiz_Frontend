import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCourseDetail } from "@/presentation/services/course.service";
import { CourseDetail } from "@/domain/entities/Course";

export default function useCourseDetail() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(
    null
  );

  const courseId = searchParams.get("uuid");
  useEffect(() => {
    (async () => {
      if (!courseId) {
        return;
      }

      try {
        const response = await getCourseDetail(courseId);
        setCourseDetail(response);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [courseId]);

  const handleLearnOptionClick = (learnOption: string, course_id: string) => {
    const newURL = `/course/${learnOption}?uuid=${course_id}`;
    router.push(newURL);
  };

  return {
    courseDetail,
    handleLearnOptionClick,
  };
}
