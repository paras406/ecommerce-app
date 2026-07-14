import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api/home";

// First row of cards is likely the LCP element; give those images priority.
const PRIORITY_IMAGE_COUNT = 4;

export default async function HomePage() {
  const { products } = await getProducts();

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Products</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < PRIORITY_IMAGE_COUNT}
          />
        ))}
      </div>
    </>
  );
}
