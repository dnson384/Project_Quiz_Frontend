import { useEffect, useState } from "react";

import { getRandomCourse } from "@/services/course";
import { getRandomPracticeTest } from "@/services/practice_test";

export default function useDashboard() {
  const [courseSample, setCourseSample] = useState<Array<any>>([]);
  const [practiceTestSample, setPracticeTestSample] = useState<Array<any>>([]);

  useEffect(() => {
    const getCourses = async () => {
      const coursesSampleData = await getRandomCourse();
      if (coursesSampleData) {
        setCourseSample(coursesSampleData);
      }
    };

    const getPracticeTest = async () => {
      const practiceTestSampleData = await getRandomPracticeTest();
      if (practiceTestSampleData) {
        setPracticeTestSample(practiceTestSampleData);
      }
    };
    getCourses();
    getPracticeTest();
  }, []);

  return { courseSample, practiceTestSample };
}
