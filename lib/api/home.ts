import type { ProductListResponse } from "@/lib/types/product";
import { BASE_URL, REVALIDATE_SECONDS } from "@/lib/api/client";

export async function getProducts(): Promise<ProductListResponse> {
  const res = await fetch(`${BASE_URL}/products`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch products (${res.status})`);
  }
  return res.json();
}
