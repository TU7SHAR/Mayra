// app/components/ProductCard.jsx

import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  // Safety check to get the first image, or a fallback
  const imagePath =
    product.images && product.images.length > 0
      ? product.images[0]
      : "/placeholder.png";

  // Safety check to get the price of the first variant, or null
  const displayPrice =
    product.variants && product.variants.length > 0
      ? product.variants[0].price
      : null;

  return (
    <Link href={`/Products/${product.slug}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="relative h-64">
          <Image
            src={imagePath}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.availability === "Sold Out" && (
            <div className="absolute top-4 right-4 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
              Sold out
            </div>
          )}
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          {/* CORRECTED: Use the price from the first variant */}
          {displayPrice !== null ? (
            <p className="text-gray-600">From Rs. {displayPrice.toFixed(2)}</p>
          ) : (
            <p className="text-gray-600">Price not available</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
