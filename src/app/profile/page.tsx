
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";

type User = {
  name: string;
  email: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const session = await authClient.getSession();
        setUser(session.data?.user ?? null);
      } catch (error) {
        console.error("Session error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function handleSignOut() {
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        alert("Sign out করা যায়নি। আবার চেষ্টা করো।");
        setSigningOut(false);
        return;
      }

      window.location.href = "/signin";
    } catch (error) {
      console.error("Sign out error:", error);
      alert("Sign out করা যায়নি। আবার চেষ্টা করো।");
      setSigningOut(false);
    }
  }

  if (loading) {
    return <main className="p-6">লোড হচ্ছে...</main>;
  }

  if (!user) {
    return (
      <main className="p-6 text-center">
        <h1 className="mb-3 text-xl font-bold">
          তুমি Sign In করো নি
        </h1>
        <Link
          href="/signin"
          className="text-green-700 underline"
        >
          Sign In
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>

      <div className="mt-5 space-y-3 rounded-xl border bg-white p-5">
        <p>
          <strong>নাম:</strong> {user.name}
        </p>

        <p>
          <strong>ইমেইল:</strong> {user.email}
        </p>

        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="mt-4 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
        >
          {signingOut ? "Sign Out হচ্ছে..." : "Sign Out"}
        </button>
      </div>
    </main>
  );
}
