import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

const secret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET || "";

export async function POST() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const params = {
    timestamp: timestamp,
  };
  const signature = await cloudinary.utils.api_sign_request(params, secret);

  return new NextResponse(JSON.stringify({ timestamp, signature }));
}
