// app/shop/page.tsx
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const ProductList = dynamic(() => import("@/components/ProductListClient"), {
  ssr: false,
  suspense: true,
});

export default function ShopPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList adminMode={false} />
      </Suspense>
    </div>
  );
}
