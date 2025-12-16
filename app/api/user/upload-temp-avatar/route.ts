import { UploadAvatarUsecase } from "@/application/usecases/user/uploadAvatar";
import { UserRepositoryImpl } from "@/infrastructure/repositories/UserRepositoryImpl";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const repo = new UserRepositoryImpl();
    const usecase = new UploadAvatarUsecase(repo);
    const newAvatar = await usecase.execute(formData);
    return NextResponse.json(newAvatar, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { detail: "An error occurred while fetching token" },
      { status: 500 }
    );
  }
}
