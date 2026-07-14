import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Product not found</h1>
      <p className="text-neutral-500 dark:text-neutral-400">
        The product you are looking for does not exist.
      </p>
      <Link href="/" className="underline">
        Back to products
      </Link>
    </div>
  );
}
