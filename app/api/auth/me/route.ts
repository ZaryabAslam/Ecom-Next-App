import { NextResponse } from "next/server";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";
import connect from "@/lib/mongoose";
import User from "@/models/User";
export async function GET() {
  const token = getTokenFromRequest();
  if (!token) return NextResponse.json({ ok: false }, { status: 401 });
  try {
    const decoded = verifyToken(token) as any;
    await connect();
    const user = await User.findById(decoded.id).select("-password");
    return NextResponse.json({ ok: true, user });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}
