import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const getCookies = cookies();
  const nextAuthSession =
    getCookies.get("next-auth.session-token")?.value || "";

  return NextResponse.json(nextAuthSession);
}
