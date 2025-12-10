// app/dashboard/products/new/page.tsx
import ProductForm from "@/components/ProductForm";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function NewProductPage() {
  // server-side auth check
  try {
    const token = cookies().get(process.env.COOKIE_NAME ?? "token")?.value;
    if (!token) throw new Error("unauth");
    verifyToken(token);
  } catch (e) {
    redirect("/login");
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Add product</h1>
      <ProductForm />
    </div>
  );
}
