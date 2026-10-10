
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";

type AuthFormProps = {
  mode: "signup" | "signin";
};

export default function AuthForm({ mode }: AuthFormProps) {
  const isSignup = mode === "signup";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setError("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }

    setLoading(true);

    try {
        if (isSignup) {
          const { error } = await authClient.signUp.email({
            name,
            email,
            password,
          });

          if (error) {
            setError(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
            return;
          }

        window.location.href = "/profile";
      } else {
        const { error } = await authClient.signIn.email({
          email,
          password,
        });

        if (error) {
          setError(error.message || "সাইন ইন করা যায়নি।");
          return;
        }

        window.location.href = "/profile";
      }
    } catch {
      setError("সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#f4f6f4] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl">
            🛒
          </div>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {isSignup ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            {isSignup
              ? "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
              : "বিস্তারিত দাম, বাজার তুলনা ও গ্রাফিক্যাল তথ্য দেখতে অ্যাকাউন্টে সাইন ইন করুন।"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
                নাম
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="যেমন: রহিম উদ্দিন"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
              ইমেইল
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              type="password"
              autoComplete={isSignup ? "new-password" : "current-password"}
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {isSignup && (
            <div>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-gray-700">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="আবার লিখুন"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          )}

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "অপেক্ষা করো..."
              : isSignup
                ? "অ্যাকাউন্ট তৈরি করুন"
                : "সাইন ইন"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-sm text-gray-400">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <p className="text-center text-sm text-gray-500">
          Google ও GitHub login এখনো configure করা হয়নি।
        </p>

        <div className="mt-7 space-y-4 text-center text-sm">
          <p className="text-gray-600">
            {isSignup ? "অ্যাকাউন্ট আছে?" : "অ্যাকাউন্ট নেই?"}{" "}
            <Link
              href={isSignup ? "/signin" : "/signup"}
              className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              {isSignup ? "সাইন ইন করুন" : "সাইন আপ করুন"}
            </Link>
          </p>

          <Link
            href="/"
            className="inline-block text-gray-500 transition hover:text-emerald-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
