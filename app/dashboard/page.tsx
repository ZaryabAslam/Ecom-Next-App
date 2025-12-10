import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-600">
        Welcome to your admin panel. Manage your products here.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Manage Products */}
        <Link
          href="/dashboard/products"
          className="p-6 bg-white shadow rounded-lg border hover:border-blue-500 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <p className="text-gray-600 text-sm">
            View, edit, and delete all products.
          </p>
        </Link>

        {/* Add Product */}
        <Link
          href="/dashboard/products/new"
          className="p-6 bg-white shadow rounded-lg border hover:border-green-500 transition"
        >
          <h2 className="text-xl font-semibold mb-2">Add Product</h2>
          <p className="text-gray-600 text-sm">
            Create a new product for your store.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
