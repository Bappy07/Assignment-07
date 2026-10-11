
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "হোম", href: "/" },
  { label: "বাজারদর", href: "/#all-products" },
  { label: "চাল", href: "/#chal" },
  { label: "ডাল", href: "/#dal" },
  { label: "তেল", href: "/#tel" },
  { label: "সবজি", href: "/#sobji" },
  { label: "মাছ", href: "/#mach" },
  { label: "মাংস", href: "/#mangsho" },
  { label: "ডিম-দুধ", href: "/#dim-dui" },
  { label: "মসলা", href: "/#mosla" },
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
      <nav className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="shrink-0">
            <div className="text-2xl font-extrabold text-green-700">
              বাজার দর
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {today || "\u00A0"}
            </p>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/profile"
              className="hidden text-sm font-medium text-gray-700 transition hover:text-green-700 sm:block"
            >
              আমার প্রোফাইল
            </Link>

            <Link
              href="/signin"
              className="shrink-0 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-800"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-5 overflow-x-auto border-t border-gray-100 pt-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 whitespace-nowrap text-sm font-medium text-gray-700 transition hover:text-green-700"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
