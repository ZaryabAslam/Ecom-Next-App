import { NextResponse } from "next/server";
import connect from "@/lib/mongoose";
import Product from "@/models/Product";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";
import { productSchema } from "@/lib/validators";
export async function GET() {
  await connect();
  const products = await Product.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ ok: true, products });
}
export async function POST(req: Request) {
  const token = getTokenFromRequest();
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    verifyToken(token);
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const parsed = productSchema.safeParse({
    ...body,
    price: Number(body.price),
  });
  if (!parsed.success)
    return NextResponse.json({ error: parsed.error.errors }, { status: 422 });
  await connect();
  const p = await Product.create(parsed.data);
  return NextResponse.json({ ok: true, product: p });
}
