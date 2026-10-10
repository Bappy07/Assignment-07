
import { getProducts } from "@/app/lib/api";

type Product = {
  id: number;
  nameBn: string;
  today: number;
  yesterday: number;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
};

export default async function PriceTicker() {
  let products: Product[] = [];

  try {
    const data = await getProducts();

    if (Array.isArray(data)) {
      products = data;
    } else if (Array.isArray(data?.data)) {
      products = data.data;
    }
  } catch (error) {
    console.error("PriceTicker error:", error);
    return null;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden border-y border-gray-200 bg-gray-50 py-3">
      <div className="flex w-max animate-marquee gap-8">
        {[...products, ...products].map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm"
          >
            <span>{product.nameBn}</span>

            <span className="font-bold text-gray-900">
              ৳{product.today}
            </span>

            <span
              className={
                product.change?.dir === "up"
                  ? "font-medium text-red-600"
                  : product.change?.dir === "down"
                    ? "font-medium text-green-700"
                    : "text-gray-500"
              }
            >
              {product.change?.dir === "up" ? "▲" : "▼"}{" "}
              {product.change?.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
