"use client";
import Header from "@/presentation/components/layout/header";
import SideMenu from "@/presentation/components/layout/sideMenu";
import ResultCard from "@/presentation/components/History/resultCard";
import useAllHistory from "@/presentation/hooks/History/useAllHistory";

export default function AllHistories() {
  const { user, histories } = useAllHistory();
  return (
    <>
      {user && (
        <>
          <Header />
          <main className="flex">
            <SideMenu />

            {histories ? (
              <section className="w-6xl mx-auto mt-3">
                <h2 className="text-3xl font-bold mb-8">Lịch sử làm bài kiểm tra</h2>
                <div className="flex flex-col gap-3">
                  {histories.map((history) => (
                    <ResultCard
                      key={history.result.id}
                      result={history.result}
                      baseInfo={history.baseInfo}
                    />
                  ))}
                </div>
              </section>
            ) : (
              <></>
            )}
          </main>
        </>
      )}
    </>
  );
}
