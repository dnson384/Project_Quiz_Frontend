import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const REAL_BACKEND_URL_API_REFRESH =
  `${process.env.NEXT_PUBLIC_BACKEND_URL_API}/auth/refresh` || "";

export async function POST(req: NextRequest) {
  const refresh_token = req.cookies.get("refresh_token")?.value;

  if (!refresh_token) {
    return NextResponse.json(
      { detail: "Không có refresh token" },
      { status: 401 }
    );
  }

  try {
    const response = await axios.post(
      REAL_BACKEND_URL_API_REFRESH,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
      }
    );
    const new_access_token = response.data.access_token;


    const nextResponse = NextResponse.json({
      detail: "Tạo lại access token thành công",
    });

    nextResponse.cookies.set("access_token", new_access_token, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      maxAge: 0.5 * 60,
    });

    return nextResponse;
  } catch (err) {
    return NextResponse.json(
      { detail: "Lỗi server khi re-generate access token" },
      { status: 500 }
    );
  }
}
