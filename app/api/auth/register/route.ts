import { NextResponse } from "next/server";
import connect from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/lib/validators";
import { signToken } from "@/lib/auth";
export async function POST(req: Request) {
  const body = await req.json();
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.errors }, { status: 422 });
  await connect();
  const exists = await User.findOne({ email: parsed.data.email });
  if (exists)
    return NextResponse.json(
      { error: "Email already used" },
      {
        status: 409,
      }
    );
  const hashed = await bcrypt.hash(parsed.data.password, 10);
  const user = await User.create({ ...parsed.data, password: hashed });
  const token = signToken({ id: user._id, email: user.email });
  const res = NextResponse.json({
    ok: true,
    user: { id: user._id, name: user.name, email: user.email },
  });
  res.cookies.set({
    name: process.env.COOKIE_NAME || "token",
    value: token,
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
  return res;
}
