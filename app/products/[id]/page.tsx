import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Rating from "@/components/Rating";
import AddToCartButton from "@/components/AddToCartButton";
import { getProduct } from "@/lib/api/products";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  return { title: product ? product.title : "Product not found" };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <article className="grid gap-8 md:grid-cols-2">
      <div className="relative aspect-square rounded-lg bg-neutral-100 dark:bg-neutral-800">
        <Image
          src={product.images[0] ?? product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          className="object-contain"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {product.brand ? `${product.brand} · ` : ""}
            {product.category}
          </p>
          <h1 className="text-2xl font-bold">{product.title}</h1>
        </div>

        <Rating value={product.rating} />

        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold">
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discountPercentage > 0 && (
            <>
              <span className="text-lg text-neutral-400 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="rounded bg-green-100 px-2 py-0.5 text-sm font-semibold text-green-700 dark:bg-green-900 dark:text-green-300">
                -{product.discountPercentage}%
              </span>
            </>
          )}
        </div>

        <p className="text-neutral-600 dark:text-neutral-300">
          {product.description}
        </p>

        <div className="mt-2 flex items-center gap-4">
          <AddToCartButton product={product} />
          <Link href="/cart" className="text-sm underline">
            Go to cart
          </Link>
        </div>
      </div>
    </article>
  );
}
