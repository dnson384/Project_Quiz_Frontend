import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const REAL_BACKEND_URL_API_SEARCH =
  `${process.env.NEXT_PUBLIC_BACKEND_URL_API}/search` || "";

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;

    const response = await axios.get(REAL_BACKEND_URL_API_SEARCH, {
      params: {
        keyword: params.get("keyword"),
        type: params.get("type"),
        cursor_id: params.get("cursor_id"),
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (err: unknown) {
    const axiosErr = err as AxiosError<{ detail: string }>;
    const stateCode = axiosErr.response?.status || 500;
    const errorMessage =
      axiosErr.response?.data?.detail || "Đã có lỗi xảy ra từ máy chủ";

    console.error("Lỗi khi gọi API tìm kiếm:", errorMessage);
    return NextResponse.json({ detail: errorMessage }, { status: stateCode });
  }
}
