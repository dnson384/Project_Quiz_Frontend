import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const REAL_BACKEND_URL_API_REGISTER =
  `${process.env.NEXT_PUBLIC_BACKEND_URL_API}/auth/register` || "";


export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const response = await axios.post(REAL_BACKEND_URL_API_REGISTER, payload);

    return NextResponse.json(response.data, { status: 201 });
  } catch (err: unknown) {
    const axiosErr = err as AxiosError<{ detail: string }>;
    const statusCode = axiosErr.response?.status || 500;
    const errorMessage =
      axiosErr.response?.data?.detail || "Đã có lỗi xảy ra từ máy chủ";

    console.error("Lỗi khi gọi API đăng ký:", errorMessage);
    return NextResponse.json({ detail: errorMessage }, { status: statusCode });
  }
}
