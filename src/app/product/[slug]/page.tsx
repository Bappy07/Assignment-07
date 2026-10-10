
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/app/lib/api";

type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  yesterday: number;
  change: {
    dir: string;
    pct: number;
  };
  markets: Market[];
};

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let products: Product[];

  try {
    const data = await getProducts();

    products = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : [];
  } catch (error) {
    console.error("Product API error:", error);

    return (
      <main className="mx-auto max-w-6xl p-6">
        পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করো।
      </main>
    );
  }

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const markets = product.markets ?? [];

  const lowest = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : product.today;

  const highest = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : product.today;

  const average = markets.length
    ? markets.reduce(
        (total, market) => total + (market.min + market.max) / 2,
        0
      ) / markets.length
    : product.today;

  const difference = product.today - product.yesterday;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 text-gray-800">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          <span>›</span>
          <span>{product.categoryNameBn}</span>
          <span>›</span>
          <span className="text-green-700">{product.nameBn}</span>
        </div>

        <section className="grid gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:grid-cols-3 md:p-8">
          <div className="flex min-h-52 items-center justify-center rounded-xl bg-green-50 text-8xl">
            {product.categoryIcon}
          </div>

          <div className="flex flex-col justify-center">
            <span className="mb-3 w-fit rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
              {product.categoryNameBn}
            </span>

            <h1 className="text-3xl font-bold">{product.nameBn}</h1>

            <p className="mt-3 text-gray-500">
              প্রতি {product.unit} · {product.categoryNameBn}
            </p>

            <p
              className={`mt-5 text-sm ${
                difference < 0
                  ? "text-green-700"
                  : difference > 0
                    ? "text-red-600"
                    : "text-gray-500"
              }`}
            >
              {difference < 0
                ? `গতকালের তুলনায় আজকের দাম কমেছে ${Math.abs(difference)} টাকা`
                : difference > 0
                  ? `গতকালের তুলনায় আজকের দাম বেড়েছে ${difference} টাকা`
                  : "গতকালের তুলনায় আজকের দাম অপরিবর্তিত"}
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-xl bg-green-50 p-6">
            <p className="text-sm text-gray-600">আজকের দাম</p>
            <p className="mt-2 text-4xl font-bold text-green-700">
              ৳{product.today}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              / {product.unit}
            </p>

            <span
              className={`mt-4 w-fit rounded-full px-3 py-2 text-sm font-semibold ${
                product.change?.dir === "up"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {product.change?.dir === "up" ? "▲ দাম বেড়েছে" : "▼ দাম কমেছে"}{" "}
              {product.change?.pct ?? 0}%
            </span>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">দামের সারসংক্ষেপ</h2>
          <p className="mt-2 text-sm text-gray-500">
            বিভিন্ন বাজারের দামের তুলনা
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SummaryCard
              title="সর্বনিম্ন দাম"
              price={lowest}
              color="text-green-700"
              note="সব বাজারের মধ্যে সর্বনিম্ন"
            />

            <SummaryCard
              title="সর্বোচ্চ দাম"
              price={highest}
              color="text-red-600"
              note="সব বাজারের মধ্যে সর্বোচ্চ"
            />

            <SummaryCard
              title="গড় দাম"
              price={average}
              color="text-blue-700"
              note="বাজারগুলোর গড় মূল্য"
            />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="mt-5 overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
            {markets.length === 0 ? (
              <p className="p-6 text-gray-500">
                এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।
              </p>
            ) : (
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead className="bg-green-50 text-gray-700">
                  <tr>
                    <th className="px-5 py-4">বাজার</th>
                    <th className="px-5 py-4">বিভাগ</th>
                    <th className="px-5 py-4">সর্বনিম্ন</th>
                    <th className="px-5 py-4">সর্বোচ্চ</th>
                    <th className="px-5 py-4">গড়</th>
                  </tr>
                </thead>

                <tbody>
                  {markets.map((market, index) => (
                    <tr
                      key={`${market.market}-${index}`}
                      className={`border-t border-gray-100 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-5 py-4 font-semibold">
                        {market.market}
                      </td>
                      <td className="px-5 py-4 text-gray-600">
                        {market.division}
                      </td>
                      <td className="px-5 py-4 text-green-700">
                        ৳{market.min}
                      </td>
                      <td className="px-5 py-4 text-red-600">
                        ৳{market.max}
                      </td>
                      <td className="px-5 py-4 font-semibold">
                        ৳{((market.min + market.max) / 2).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        <footer className="mt-12 flex flex-col gap-3 border-t border-gray-200 py-6 text-sm text-gray-500 sm:flex-row sm:justify-between">
          <p>
            <span className="font-bold text-green-700">বাজার দর</span>
            {" "}— প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
          <p>
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </footer>
      </div>
    </main>
  );
}

function SummaryCard({
  title,
  price,
  color,
  note,
}: {
  title: string;
  price: number;
  color: string;
  note: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className={`mt-3 text-3xl font-bold ${color}`}>
        ৳{price.toFixed(2)}
      </p>
      <p className="mt-2 text-sm text-gray-500">{note}</p>
    </div>
  );
}
