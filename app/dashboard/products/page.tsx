// app/dashboard/products/page.tsx
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import Link from "next/link";

const ProductList = dynamic(() => import("@/components/ProductListClient"), {
  ssr: false,
  suspense: true,
});

export default function ProductsDashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link
          href="/dashboard/products/new"
          className="px-3 py-2 bg-green-600 text-white rounded"
        >
          Add product
        </Link>
      </div>

      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList adminMode />
      </Suspense>
    </div>
  );
}
