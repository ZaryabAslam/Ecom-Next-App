import { NextResponse } from "next/server";
import connect from "@/lib/mongoose";
import Product from "@/models/Product";
import { getTokenFromRequest, verifyToken } from "@/lib/auth";
import { productSchema } from "@/lib/validators";
export async function GET(req: Request, { params }: any) {
  await connect();
  const p = await Product.findById(params.id);
  if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, product: p });
}
async function requireAuth() {
  const token = getTokenFromRequest();
  if (!token) throw new Error("unauth");
  verifyToken(token);
}
export async function PATCH(req: Request, { params }: any) {
  try {
    await requireAuth();
  } catch (e) {
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
  const p = await Product.findByIdAndUpdate(params.id, parsed.data, {
    new: true,
  });
  return NextResponse.json({ ok: true, product: p });
}
export async function DELETE(req: Request, { params }: any) {
  try {
    await requireAuth();
  } catch (e) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await connect();
  await Product.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
