import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const REAL_BACKEND_URL_API_ME =
  `${process.env.NEXT_PUBLIC_BACKEND_URL_API}/user/me` || "";

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("access_token")?.value;
    if (!accessToken) {
      return NextResponse.json(
        { detail: "Missing access token" },
        { status: 401 }
      );
    }

    const response = await axios.get(REAL_BACKEND_URL_API_ME, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { detail: "An error occurred while fetching token" },
      { status: 500 }
    );
  }
}
