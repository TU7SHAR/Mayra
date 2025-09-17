import { products } from "@/app/data/products"; // Import the data
import ProductCard from "./ProductCard"; // Reuse our new card component

const FeaturedProducts = () => {
  // Filter the products to get only the featured ones
  const featured = products.filter((p) => p.isFeatured);

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
