// components/ProductListClient.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductListClient({
  adminMode = false,
}: {
  adminMode?: boolean;
}) {
  const [products, setProducts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch("/api/products")
      .then((r) => r.json())
      .then((j) => {
        if (!mounted) return;
        setProducts(j.products || []);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setProducts([]);
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((p) => p?.filter((x: any) => x._id !== id) || []);
    } else {
      alert("Delete failed");
    }
  }

  if (loading) return <div className="p-4">Loading products...</div>;
  if (!products || products.length === 0)
    return <div className="p-4">No products yet.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((p: any) => (
        <div key={p._id} className="border rounded p-4 bg-white shadow">
          {p.image ? (
            <img
              src={p.image}
              alt={p.name}
              className="h-40 w-full object-cover rounded"
            />
          ) : (
            <div className="h-40 bg-gray-100 flex items-center justify-center rounded">
              No Image
            </div>
          )}
          <h3 className="mt-2 font-semibold">{p.name}</h3>
          <p className="text-sm text-gray-600">${Number(p.price).toFixed(2)}</p>

          {adminMode && (
            <div className="mt-3 flex gap-3">
              <Link
                href={`/dashboard/products/${p._id}/edit`}
                className="text-blue-600"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(p._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
