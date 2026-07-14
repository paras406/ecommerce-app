import type { Product, ProductListResponse } from "./types";

const BASE_URL = "https://dummyjson.com";
const REVALIDATE_SECONDS = 300;

export async function getProducts(): Promise<ProductListResponse> {
  const res = await fetch(`${BASE_URL}/products`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch products (${res.status})`);
  }
  return res.json();
}

export async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id} (${res.status})`);
  }
  return res.json();
}
