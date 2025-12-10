import "../styles/globals.css";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "My Ecom Admin",
  description: "Admin dashboard for managing products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* NAVBAR */}
        <header className="bg-white shadow">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl">
              MyEcom
            </Link>

            <nav className="flex items-center gap-5 text-sm">
              <Link href="/shop" className="hover:text-blue-600">
                Shop
              </Link>
              <Link href="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/login" className="hover:text-blue-600">
                Login
              </Link>
            </nav>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

        {/* FOOTER */}
        <footer className="border-t mt-10">
          <div className="max-w-6xl mx-auto px-4 py-5 text-center text-sm text-gray-600">
            © {new Date().getFullYear()} MyEcom Admin
          </div>
        </footer>
      </body>
    </html>
  );
}
