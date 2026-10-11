
const API_URL = "https://openapi.programming-hero.com/api/bazardor";

export async function getProducts() {
  const response = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}
