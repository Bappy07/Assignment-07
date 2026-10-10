
import Link from "next/link";
import { Suspense } from "react";
import { getProducts } from "@/app/lib/api";
import CategoryProducts from "@/app/components/CategoryProduct";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
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

const categoryNames: Record<string, string> = {
  chal: "চাল",
  dal: "ডাল",
  tel: "তেল",
  sobji: "সবজি",
  mach: "মাছ",
  mangsho: "মাংস",
  "dim-dudh": "ডিম-দুধ",
  mosla: "মসলা",
};

function CategoryLoading() {
  return (
    <main className="min-h-screen bg-[#f4f6f4] px-4 py-8">
      <div className="mx-auto max-w-7xl animate-pulse rounded-2xl bg-white p-8">
        <div className="h-8 w-48 rounded bg-gray-200" />
        <div className="mt-4 h-4 w-72 rounded bg-gray-200" />
      </div>
    </main>
  );
}

async function CategoryContent({ slug }: { slug: string }) {
  const data = await getProducts();

  const products: Product[] = Array.isArray(data)
    ? data
    : data.products ?? data.data ?? [];

  const filteredProducts = products.filter(
    (product) => product.category === slug
  );

  const categoryName =
    filteredProducts[0]?.categoryNameBn ?? categoryNames[slug] ?? "পণ্য";

  return (
    <main className="min-h-screen bg-[#f4f6f4] px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-2xl bg-emerald-700 p-6 text-white sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-4xl">
              {filteredProducts[0]?.categoryIcon ?? "🛒"}
            </div>

            <div>
              <h1 className="text-3xl font-bold">{categoryName}</h1>
              <p className="mt-2 text-sm text-emerald-50">
                প্রতি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </section>

        {filteredProducts.length === 0 ? (
          <div className="mt-6 rounded-xl border border-gray-200 bg-white p-10 text-center">
            <p className="text-lg font-semibold text-gray-800">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
            </p>

            <Link
              href="/"
              className="mt-4 inline-block text-emerald-700 hover:underline"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <CategoryProducts products={filteredProducts} />
        )}
      </div>
    </main>
  );
}


export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense fallback={<CategoryLoading />}>
      <CategoryPageContent params={params} />
    </Suspense>
  );
}

async function CategoryPageContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <CategoryContent slug={slug} />;
}
