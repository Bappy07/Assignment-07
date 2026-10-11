
"use client";

import Link from "next/link";
import { useState } from "react";

const categories = [
  { name: "চাল", slug: "chal", icon: "🍚" },
  { name: "ডাল", slug: "dal", icon: "🫘" },
  { name: "তেল", slug: "tel", icon: "🛢️" },
  { name: "সবজি", slug: "sobji", icon: "🥬" },
  { name: "মাছ", slug: "mach", icon: "🐟" },
  { name: "মাংস", slug: "mangsho", icon: "🍗" },
  { name: "ডিম-দুধ", slug: "dim-dui", icon: "🥛" },
  { name: "মসলা", slug: "mosla", icon: "🌶️" },
];

type NavbarProps = {
  isLoggedIn?: boolean;
  userName?: string;
  avatarUrl?: string;
  onSignOut?: () => void;
};

export default function Navbar({
  isLoggedIn = false,
  userName = "Rezwan",
  avatarUrl,
  onSignOut,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function closeMenus() {
    setMenuOpen(false);
    setProfileOpen(false);
  }

    function handleSignOut() {
      closeMenus();
      onSignOut?.();
    }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
    
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          onClick={closeMenus}
          className="flex min-w-0 items-center gap-3"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-2xl text-white">
            🛒
          </span>

          <span className="min-w-0">
            <span className="block text-xl font-bold text-gray-900 sm:text-2xl">
              বাজার দর
            </span>
            <span className="mt-1 block text-xs text-gray-500 sm:text-sm">
              {today}
            </span>
          </span>
        </Link>

{/* Desktop */}
        <div className="hidden items-center gap-3 sm:flex">
          {isLoggedIn ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-expanded={profileOpen}
                className="flex items-center gap-2 rounded-lg px-3 py-2 transition hover:bg-gray-100"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={`${userName} avatar`}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                )}

                <span className="max-w-32 truncate text-sm font-semibold text-gray-800">
                  {userName}
                </span>
                <span className="text-xs text-gray-500">
                  {profileOpen ? "▲" : "▼"}
                </span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                  <Link
                    href="/profile"
                    onClick={closeMenus}
                    className="block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-emerald-50"
                  >
                    আমার প্রোফাইল
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-lg border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu  */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          aria-expanded={menuOpen}
          className="rounded-lg border border-gray-200 px-3 py-2 text-xl text-gray-700 transition hover:bg-gray-50 sm:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      <nav className="hidden border-t border-gray-100 sm:block">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 sm:px-6">
          <Link
            href="/"
            className="shrink-0 px-3 py-3 text-sm font-medium text-gray-700 hover:text-emerald-700"
          >
            হোম
          </Link>

          <Link
            href="/#all-products"
            className="shrink-0 px-3 py-3 text-sm font-medium text-gray-700 hover:text-emerald-700"
          >
            বাজারদর
          </Link>

          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="shrink-0 whitespace-nowrap px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </Link>
          ))}
        </div>
      </nav>


      {menuOpen && (
        <nav className="border-t border-gray-100 bg-white px-4 py-3 sm:hidden">
          <div className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={closeMenus}
              className="rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-emerald-50"
            >
              🏠 হোম
            </Link>

            <Link
              href="/#all-products"
              onClick={closeMenus}
              className="rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-emerald-50"
            >
              🛒 বাজারদর
            </Link>

            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                onClick={closeMenus}
                className="rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-emerald-50"
              >
                {category.icon} {category.name}
              </Link>
            ))}

            <div className="mt-2 border-t border-gray-100 pt-3">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/profile"
                    onClick={closeMenus}
                    className="block rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-emerald-50"
                  >
                    👤 আমার প্রোফাইল
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full rounded-lg px-3 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    সাইন আউট
                  </button>
                </>
              ) : (
                <div className="flex gap-3">
                  <Link
                    href="/signin"
                    onClick={closeMenus}
                    className="flex-1 rounded-lg border border-emerald-600 px-3 py-2.5 text-center text-sm font-semibold text-emerald-700"
                  >
                    সাইন ইন
                  </Link>

                  <Link
                    href="/signup"
                    onClick={closeMenus}
                    className="flex-1 rounded-lg bg-emerald-600 px-3 py-2.5 text-center text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    সাইন আপ
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
