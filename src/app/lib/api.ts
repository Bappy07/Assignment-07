const API_URL = "https://api.abcz.workers.dev/api/bazardor";

export async function getProducts() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${API_URL}/products`, {
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}