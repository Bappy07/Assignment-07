"use client";

import { useState } from "react";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon?: string;
  image?: string;
  unit: string;
  today: number;
  yesterday?: number;
  change?: {
    dir: string;
    pct: number;
  };
};

export default function CategoryProducts({
  products,
}: {
  products: Product[];
}) {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") return a.today - b.today;
    if (sort === "high") return b.today - a.today;
    return 0;
  });

  return (
    <>
      <div className="mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </p>

        <label className="flex items-center gap-3 text-sm text-gray-600">
          বাছুন
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-emerald-600"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="mt-6 rounded-xl bg-white p-10 text-center text-gray-600">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => {
            const isUp = product.change?.dir === "up";

            return (
              <article
                key={product.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-32 items-center justify-center rounded-xl bg-emerald-50 text-5xl">
                  {product.image ?? product.categoryIcon ?? "🛒"}
                </div>

                <p className="mt-4 text-xs font-medium text-emerald-700">
                  {product.categoryNameBn}
                </p>

                <h2 className="mt-1 text-lg font-bold text-gray-900">
                  {product.nameBn}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
                </p>

                <div className="mt-4 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-xs text-gray-500">আজকের দাম</p>
                    <p className="mt-1 text-2xl font-bold text-gray-900">
                      ৳{product.today.toLocaleString("bn-BD")}
                    </p>
                  </div>

                  {product.change && (
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        isUp
                          ? "bg-red-50 text-red-600"
                          : product.change.dir === "down"
                            ? "bg-emerald-50 text-emerald-200"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {isUp ? "▲" : product.change.dir === "down" ? "▼" : "—"}{" "}
                      {product.change.pct.toLocaleString("bn-BD")}%
                    </span>
                  )}
                </div>

                {product.yesterday !== undefined && (
                  <p className="mt-3 border-t border-gray-100 pt-3 text-sm text-gray-500">
                    গতকাল: ৳{product.yesterday.toLocaleString("bn-BD")}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}