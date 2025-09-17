import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    // We wrap the card in a Link to prepare for the dedicated product pages
    <Link href={`/products/${product.slug}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="relative h-100">
          <Image
            src={product.imageUrl}
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
          <p className="text-gray-600">From Rs. {product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
