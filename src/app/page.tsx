import Link from "next/link";
import { getProducts } from "@/app/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  // দাম বেড়েছে
  const increasedProducts = products.filter(
    (product: any) => product.today > product.yesterday
  );

  // দাম কমেছে
  const decreasedProducts = products.filter(
    (product: any) => product.today < product.yesterday
  );

  const categories = [
    { name: "চাল", slug: "chal", icon: "🍚" },
    { name: "ডাল", slug: "dal", icon: "🫘" },
    { name: "তেল", slug: "tel", icon: "🫗" },
    { name: "সবজি", slug: "sobji", icon: "🥬" },
    { name: "মাছ", slug: "mach", icon: "🐟" },
    { name: "মাংস", slug: "mangsho", icon: "🍗" },
    { name: "ডিম-দুধ", slug: "dim-dudh", icon: "🥚" },
    { name: "মসলা", slug: "mosla", icon: "🌶️" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">


        {/* Hero Section */}
        <section className="grid items-center gap-8 overflow-hidden rounded-2xl bg-green-50 p-6 sm:p-8 md:grid-cols-2 md:p-12">
          <div>
            <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
              মঙ্গলবার, ৬ অক্টোবর, ২০২৩
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-4 max-w-lg leading-7 text-gray-600">
              প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের বর্তমান দাম জানুন।
              বিভিন্ন পণ্যের দাম বাড়ছে নাকি কমছে, সহজেই তুলনা করুন।
            </p>

            <Link
              href="#all-products"
              className="mt-6 inline-block rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              সব পণ্য দেখুন →
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <img
              src="/image/bazar-hero.png"
              alt="বাজারের ফল ও সবজির ঝুড়ি"
              className="h-auto w-full max-w-md object-contain"
            />
          </div>
        </section>

        {/* Price Increased */}
        <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                <span className="mr-2 text-red-600">↑</span>
                আজ দাম বেড়েছে
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                যেসব পণ্যের দাম গতকালের তুলনায় বেড়েছে
              </p>
            </div>

            <span className="rounded-full bg-red-50 px-3 py-1 text-sm text-red-600">
              {increasedProducts.length} টি পণ্য
            </span>
          </div>

          {increasedProducts.length === 0 ? (
            <p className="mt-5 rounded-xl bg-white p-6 text-gray-500">
              দাম বেড়েছে এমন কোনো পণ্য পাওয়া যায়নি।
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {increasedProducts.slice(0, 8).map((product: any) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-3xl">
                      {product.image || "🛒"}
                    </span>

                    <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
                      ▲ {product.change?.pct ?? ""}
                      {product.change?.pct != null ? "%" : ""}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold">
                    {product.nameBn}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    প্রতি {product.unit}
                  </p>

                  <div className="mt-4 flex items-end justify-between gap-2">
                    <p className="text-2xl font-bold">
                      ৳{product.today}
                    </p>

                    <p className="text-sm text-gray-500">
                      আগে ৳{product.yesterday}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Price Decreased */}
        <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">
                <span className="mr-2 text-green-600">↓</span>
                আজ দাম কমেছে
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                যেসব পণ্যের দাম গতকালের তুলনায় কমেছে
              </p>
            </div>

            <span className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-700">
              {decreasedProducts.length} টি পণ্য
            </span>
          </div>

          {decreasedProducts.length === 0 ? (
            <p className="mt-5 rounded-xl bg-white p-6 text-gray-500">
              দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {decreasedProducts.slice(0, 8).map((product: any) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-3xl">
                      {product.image || "🛒"}
                    </span>

                    <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                      ▼ {product.change?.pct ?? ""}
                      {product.change?.pct != null ? "%" : ""}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold">
                    {product.nameBn}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    প্রতি {product.unit}
                  </p>

                  <div className="mt-4 flex items-end justify-between gap-2">
                    <p className="text-2xl font-bold">
                      ৳{product.today}
                    </p>

                    <p className="text-sm text-gray-500">
                      আগে ৳{product.yesterday}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* All Products */}
        <section id="all-products" className="mt-12 scroll-mt-6">
          <h2 className="text-2xl font-bold sm:text-3xl">
            সব পণ্য
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            শ্রেণী অনুযায়ী সমস্ত পণ্যের তালিকা
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product: any) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-3xl">
                    {product.image || "🛒"}
                  </span>

                  {product.today > product.yesterday ? (
                    <span className="rounded-full bg-red-50 px-3 py-1 text-sm text-red-600">
                      ▲ {product.change?.pct ?? ""}%
                    </span>
                  ) : product.today < product.yesterday ? (
                    <span className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-700">
                      ▼ {product.change?.pct ?? ""}%
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500">
                      অপরিবর্তিত
                    </span>
                  )}
                </div>

                <p className="mt-4 text-xs text-green-700">
                  {product.categoryNameBn}
                </p>

                <h3 className="mt-1 text-lg font-bold">
                  {product.nameBn}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  প্রতি {product.unit}
                </p>

                <div className="mt-4 flex items-end justify-between gap-2">
                  <p className="text-2xl font-bold">
                    ৳{product.today}
                  </p>

                  <span className="text-sm text-gray-500">
                    গতকাল ৳{product.yesterday}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}