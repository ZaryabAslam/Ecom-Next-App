// app/dashboard/products/[id]/edit/page.tsx
import ProductForm from "@/components/ProductForm";
import connect from "@/lib/mongoose";
import Product from "@/models/Product";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function EditPage({ params }: { params: { id: string } }) {
  // server auth
  try {
    const token = cookies().get(process.env.COOKIE_NAME ?? "token")?.value;
    if (!token) throw new Error("unauth");
    verifyToken(token);
  } catch (e) {
    redirect("/login");
  }

  await connect();
  const p = await Product.findById(params.id).lean();
  if (!p) redirect("/dashboard");

  // pass serializable data
  const defaultValues = JSON.parse(JSON.stringify({ ...p, _id: p._id }));

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Edit product</h1>
      {/* ProductForm will detect _id and PATCH */}
      <ProductForm defaultValues={defaultValues} />
    </div>
  );
}
