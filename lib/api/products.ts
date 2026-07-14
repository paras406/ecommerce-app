import type { Product } from "@/lib/types/product";
import { BASE_URL, REVALIDATE_SECONDS } from "@/lib/api/client";

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
