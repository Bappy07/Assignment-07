"use client";

import Link from "next/link";
import { useState } from "react";

const categories = [
  { name: "চাল", slug: "chal", icon: "🌾" },
  { name: "ডাল", slug: "dal", icon: "🫘" },
  { name: "তেল", slug: "tel", icon: "🫗" },
  { name: "সবজি", slug: "sobji", icon: "🥬" },
  { name: "মাছ", slug: "mach", icon: "🐟" },
  { name: "মাংস", slug: "mangsho", icon: "🍗" },
  { name: "ডিম-দুধ", slug: "dim-dudh", icon: "🥚" },
  { name: "মসলা", slug: "mosla", icon: "🌶️" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Temporary demo state. Real authentication is not connected yet.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        {/* Main Header */}
        <div className="flex min-h-20 items-center justify-between gap-4">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-xl text-white">
              🛒
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">
                বাজার দর
              </h1>
              <p className="text-xs text-gray-500">
                প্রয়োজনীয় পণ্যের দাম এক নজরে
              </p>
              <p className="text-xs text-gray-500">
                {new Intl.DateTimeFormat("bn-BD", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "Asia/Dhaka",
                }).format(new Date())}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-5 sm:flex">
            <Link
              href="/"
              className="font-medium text-gray-700 hover:text-emerald-600"
            >
              হোম
            </Link>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                    R
                  </span>
                  <span className="font-medium text-gray-700">Rezwan</span>
                  <span className="text-xs">▼</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-md px-3 py-2 text-sm hover:bg-gray-50"
                    >
                      আমার প্রোফাইল
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setIsLoggedIn(false);
                        setProfileOpen(false);
                      }}
                      className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      লগ আউট
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="rounded-lg px-4 py-2 font-medium text-gray-700 hover:text-emerald-600"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/signup"
                  className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-emerald-700"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-gray-700 sm:hidden"
            aria-label="মেনু খুলুন বা বন্ধ করুন"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden items-center gap-7 overflow-x-auto border-t border-gray-100 py-3 md:flex">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="flex shrink-0 items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-emerald-600"
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="border-t border-gray-100 py-4 sm:hidden">
            <div className="mb-4 flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                হোম
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Rezwan · আমার প্রোফাইল
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setMenuOpen(false);
                    }}
                    className="rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    লগ আউট
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/signin"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg border border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-700"
                  >
                    সাইন ইন
                  </Link>

                  <Link
                    href="/signup"
                    className="rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white hover:bg-emerald-700"
                  >
                    সাইন আপ
                  </Link>
                </div>
              )}
            </div>

            <p className="mb-2 border-t border-gray-100 pt-3 text-xs font-semibold text-gray-400">
              পণ্যের ক্যাটাগরি
            </p>

            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-3 text-sm text-gray-700 hover:bg-emerald-50"
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
