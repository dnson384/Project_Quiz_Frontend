import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const REAL_BACKEND_URL_API_COURSE =
  `${process.env.NEXT_PUBLIC_BACKEND_URL_API}/course/test` || "";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;

    const response = await axios.get(REAL_BACKEND_URL_API_COURSE, {
      params: {
        course_id: params.get("course_id"),
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (err: unknown) {
    const axiosErr = err as AxiosError<{ detail: string }>;
    const stateCode = axiosErr.response?.status || 500;
    const errMessage =
      axiosErr.response?.data.detail || "Đã có lỗi xảy ra từ máy chủ";

    console.error(
      "Lỗi khi gọi API lấy thông tin câu hỏi kiểm tra",
      errMessage
    );
    return NextResponse.json({ detail: errMessage }, { status: stateCode });
  }
}
