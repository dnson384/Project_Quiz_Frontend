import { useEffect, useState } from "react";

import { getRandomCourse } from "@/services/course";

export default function useDashboard() {
  const [courseSample, setCourseSample] = useState<Array<any>>([]);
  useEffect(() => {
    const getCourses = async () => {
      const coursesSampleData = await getRandomCourse();
      if (coursesSampleData) {
        setCourseSample(coursesSampleData)
      }
    };
    getCourses();
  }, []);

  return { courseSample };
}
