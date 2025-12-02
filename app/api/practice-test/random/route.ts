import { isAxiosError } from "axios";
import { NextResponse } from "next/server";

import { GetRandomPracticeTestsUsecase } from "@/application/usecases/practiceTest/getRandom";
import { PracticeTestRepositoryImpl } from "@/infrastructure/repositories/PracticeTestRepositoryImpl";

export async function GET() {
  try {
    const repo = new PracticeTestRepositoryImpl();
    const useCase = new GetRandomPracticeTestsUsecase(repo);

    const practiceTests = await useCase.execute();

    return NextResponse.json(practiceTests, { status: 200 });
  } catch (err: unknown) {
    console.error("Lỗi API:", err);

    if (isAxiosError(err) && err.response)
      return NextResponse.json(
        { detail: err.response.data.detail || "Lỗi từ Backend" },
        { status: err.response.status }
      );

    return NextResponse.json(
      { detail: "Internal Server Error" },
      { status: 500 }
    );
  }
}
