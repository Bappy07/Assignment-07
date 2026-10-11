
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [today, setToday] = useState("");

  useEffect(() => {
    const date = new Date();

    setToday(
      date.toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  function closeMenus() {
    setMenuOpen(false);
    setProfileOpen(false);
  }
  function handleSignOut() {
    closeMenus();
    onSignOut?.();
  }
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Main Navbar */}
      <div className="border-b border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenus}
            className="flex shrink-0 items-center gap-2"
          >
            <img
              src="/image/logo-icon.png"
              alt="BazarDor Logo"
              className="h-10 w-10 object-contain"
            />

            <div>
              <h1 className="text-xl font-bold text-green-700">
                বাজারদর
              </h1>
              <p className="text-xs text-gray-500">BazarDor</p>
            </div>
          </Link>

          {/* Date */}
          <div className="hidden text-center md:block">
            <p className="text-sm font-medium text-gray-700">
              আজকের বাজারদর
            </p>
            <p className="mt-1 text-xs text-gray-500">
              {today || "আজকের তারিখ"}
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/#all-products"
              className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              বাজারদর দেখুন
            </Link>

            {!isLoggedIn ? (
              <>
                <Link
                  href="/signin"
                  className="rounded-lg border border-green-600 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
                >
                  লগইন
                </Link>

                <Link
                  href="/signup"
                  className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
                >
                  রেজিস্ট্রেশন
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={userName}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700">
                      {userName.charAt(0).toUpperCase()}
                    </span>
                  )}

                  <span className="text-sm font-medium text-gray-700">
                    {userName}
                  </span>

                  <span className="text-gray-500">⌄</span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                    <Link
                      href="/profile"
                      onClick={closeMenus}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-green-50"
                    >
                      আমার প্রোফাইল
                    </Link>

                    <Link
                      href="/profile/update"
                      onClick={closeMenus}
                      className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-green-50"
                    >
                      প্রোফাইল আপডেট
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      লগআউট
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-2xl text-gray-700 hover:bg-gray-100 sm:hidden"
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>
      </div>

      {/* Desktop Categories */}
      <nav className="hidden sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 overflow-x-auto px-4 py-2">
          <Link
            href="/"
            className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
          >
            হোম
          </Link>

          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="shrink-0 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700"
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-4 shadow-md sm:hidden">
          <p className="mb-3 text-sm text-gray-500">
            {today || "আজকের বাজারদর"}
          </p>

          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={closeMenus}
              className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-green-50"
            >
              🏠 হোম
            </Link>

            <Link
              href="/#all-products"
              onClick={closeMenus}
              className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-green-50"
            >
              🛒 সব পণ্যের দাম
            </Link>

            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                onClick={closeMenus}
                className="rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-green-50"
              >
                {category.icon} {category.name}
              </Link>
            ))}
          </nav>

          <div className="mt-4 border-t border-gray-100 pt-4">
            {!isLoggedIn ? (
              <div className="flex gap-2">
                <Link
                  href="/signin"
                  onClick={closeMenus}
                  className="flex-1 rounded-lg border border-green-600 px-3 py-2 text-center text-sm font-semibold text-green-700"
                >
                  লগইন
                </Link>

                <Link
                  href="/signup"
                  onClick={closeMenus}
                  className="flex-1 rounded-lg bg-green-700 px-3 py-2 text-center text-sm font-semibold text-white"
                >
                  রেজিস্ট্রেশন
                </Link>
              </div>
            ) : (
              <div>
                <p className="mb-2 text-sm font-medium text-gray-800">
                  {userName}
                </p>

                <Link
                  href="/profile"
                  onClick={closeMenus}
                  className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-green-50"
                >
                  আমার প্রোফাইল
                </Link>

                <Link
                  href="/profile/update"
                  onClick={closeMenus}
                  className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-green-50"
                >
                  প্রোফাইল আপডেট
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  লগআউট
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
