import { UpdateMeUsecase } from "@/application/usecases/user/updateMe";
import { UserRepositoryImpl } from "@/infrastructure/repositories/UserRepositoryImpl";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("access_token")?.value;
    if (!accessToken) {
      return NextResponse.json(
        { detail: "Missing access token" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const repo = new UserRepositoryImpl();
    const usecase = new UpdateMeUsecase(repo);
    const updatedUser = await usecase.execute(accessToken, body);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { detail: "An error occurred while fetching token" },
      { status: 500 }
    );
  }
}
