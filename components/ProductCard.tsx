import Image from "next/image";
import Link from "next/link";
import Rating from "./Rating";
import type { Product } from "@/lib/types";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-black/10 bg-white transition-shadow hover:shadow-md dark:border-white/10 dark:bg-neutral-900"
    >
      <div className="relative aspect-square bg-neutral-100 dark:bg-neutral-800">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={priority}
          className="object-contain transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h2 className="line-clamp-2 text-sm font-medium">{product.title}</h2>
        <Rating value={product.rating} />
        <p className="mt-auto text-base font-semibold">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
