import { AxiosError } from "axios";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const REAL_BACKEND_URL = "http://127.0.0.1:8000/api/auth/login";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const response = await axios.post(REAL_BACKEND_URL, payload);

    const { token, user } = response.data;

    if (!token) {
      return NextResponse.json(
        { detail: "Không nhận được token từ máy chủ backend" },
        { status: 500 }
      );
    }

    const nextResponse = NextResponse.json({ user: user });

    nextResponse.cookies.set("access_token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      maxAge: 15 * 60,
    });

    return nextResponse;
  } catch (err: unknown) {
    const axiosErr = err as AxiosError<{ detail: string }>;
    const statusCode = axiosErr.response?.status || 500;
    const errorMessage =
      axiosErr.response?.data?.detail || "Đã có lỗi xảy ra từ máy chủ";

    console.error("Lỗi khi gọi API đăng nhập:", errorMessage);

    return NextResponse.json({ detail: errorMessage }, { status: statusCode });
  }
}
