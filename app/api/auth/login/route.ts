import { AxiosError } from "axios";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const REAL_BACKEND_URL_API_LOGIN =
  `${process.env.NEXT_PUBLIC_BACKEND_URL_API}/auth/login` || "";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const response = await axios.post(REAL_BACKEND_URL_API_LOGIN, payload);

    const { access_token, refresh_token, user } = response.data;

    if (!access_token || !refresh_token) {
      return NextResponse.json(
        { detail: "Không nhận được token từ máy chủ backend" },
        { status: 500 }
      );
    }

    const nextResponse = NextResponse.json({ user: user });

    nextResponse.cookies.set("access_token", access_token, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      maxAge: 15 * 60,
    });

    nextResponse.cookies.set("refresh_token", refresh_token, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60,
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
