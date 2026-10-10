"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "হোম", href: "/" },
  { label: "বাজারদর", href: "/#all-products" },
  { label: "আমার প্রোফাইল", href: "/profile" },
];

export default function Navbar() {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      }).format(new Date())
    );
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <div className="text-2xl font-extrabold text-green-700">
            বাজার দর
          </div>

          <p className="mt-1 text-xs text-gray-500">
            {today || "\u00A0"}
          </p>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 transition hover:text-green-700"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/signin"
            className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
          >
            Sign In
          </Link>
        </div>
        <Link
          href="/signin"
          className="rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-800 md:hidden"
        >
          Sign In
        </Link>
      </nav>
    </header>
  );
}