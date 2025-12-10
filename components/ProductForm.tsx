// components/ProductForm.tsx
"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "@/lib/validators";
import { z } from "zod";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof productSchema> & { _id?: string };

export default function ProductForm({
  defaultValues,
}: {
  defaultValues?: Partial<FormData>;
}) {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues as any,
  });

  async function onSubmit(data: FormData) {
    try {
      const isEdit = !!(data as any)._id;
      const url = isEdit
        ? `/api/products/${(data as any)._id}`
        : "/api/products";
      const method = isEdit ? "PATCH" : "POST";
      const body = {
        name: data.name,
        price: Number(data.price),
        description: data.description || "",
        image: data.image || "",
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "Failed");
      // go back to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message || "Failed");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded shadow"
    >
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input {...register("name")} className="w-full p-2 border rounded" />
        {formState.errors.name && (
          <p className="text-red-600 text-sm">
            {String(formState.errors.name.message)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          {...register("price", { valueAsNumber: true })}
          type="number"
          step="0.01"
          className="w-full p-2 border rounded"
        />
        {formState.errors.price && (
          <p className="text-red-600 text-sm">
            {String(formState.errors.price.message)}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Image (URL)</label>
        <input {...register("image")} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          {...register("description")}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <button
          disabled={formState.isSubmitting}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          {formState.isSubmitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
