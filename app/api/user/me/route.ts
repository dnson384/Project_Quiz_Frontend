import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

const REAL_BACKEND_URL = "http://127.0.0.1:8000/api/user/me";

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("access_token");
    return NextResponse.json({ token: accessToken });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "An error occurred while fetching token" },
      { status: 500 }
    );
  }
}
