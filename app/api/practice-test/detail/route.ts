import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import { GetPracticeTestDetailUsecase } from "@/application/usecases/practiceTest/getDetail";
import { PracticeTestRepositoryImpl } from "@/infrastructure/repositories/PracticeTestRepositoryImpl";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const practiceTestId = params.get("practice_test_id");
    const count = Number(params.get("count")) || undefined;
    if (!practiceTestId) return;

    const repo = new PracticeTestRepositoryImpl();
    const usecase = new GetPracticeTestDetailUsecase(repo);
    const practiceTestDetail = await usecase.execute(practiceTestId, count);

    return NextResponse.json(practiceTestDetail, { status: 200 });
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
