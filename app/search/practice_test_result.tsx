"use client";
import PracticeTestCard from "@/components/practice_test_card";

interface PracticeTestData {
  practiceTests: Array<any>;
  // handleLoadMoreResults: () => void;
  // notification: string | null;
}

export default function PracticeTestResult({
  practiceTests,
}: PracticeTestData) {
  return (
    <>
      {practiceTests && (
        <div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-6">
            {practiceTests.map((practiceTest) => {
              return (
                <PracticeTestCard
                  key={practiceTest.practice_test_id}
                  practiceTestId={practiceTest.practice_test_id}
                  practiceTestName={practiceTest.practice_test_name}
                  authorName={practiceTest.author_username}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
