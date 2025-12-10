// app/page.tsx
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome — My Ecom Admin</h1>
      <p className="mb-6">
        Manage products from the dashboard or browse the public shop.
      </p>
      <div className="flex justify-center gap-3">
        <Link href="/shop" className="px-4 py-2 bg-gray-200 rounded">
          Shop
        </Link>
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
