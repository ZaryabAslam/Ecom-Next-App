import { NextResponse } from "next/server";
export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: process.env.COOKIE_NAME || "token",
    value: "",
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });
  return res;
}
