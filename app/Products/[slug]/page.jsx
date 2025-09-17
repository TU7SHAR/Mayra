"use client";

import { useState, use, useEffect } from "react";
import { products } from "@/app/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  useEffect(() => {
    setSelectedVariant(product.variants ? product.variants[0] : null);
    setSelectedImage(product.images[0]);
    setQuantity(1);
  }, [product]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert("Please select a size/variant.");
      return;
    }
    console.log(
      `Added ${quantity} of ${product.name} (${selectedVariant.name}) to cart!`
    );
    alert(
      `Added ${quantity} of ${product.name} (${selectedVariant.name}) to cart!`
    );
  };

  const handleBuyNow = () => {
    if (!selectedVariant) {
      alert("Please select a size/variant.");
      return;
    }
    console.log(
      `Buying ${quantity} of ${product.name} (${selectedVariant.name}) immediately.`
    );
    alert(
      `Proceeding to checkout with ${quantity} of ${product.name} (${selectedVariant.name}).`
    );
  };

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* --- Image Gallery --- */}
          <div>
            <div className="relative w-full h-96 mb-4">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-contain rounded-lg"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  // CORRECTED: Using arbitrary value for border color
                  className={`relative w-20 h-20 flex-shrink-0 border-2 rounded-lg cursor-pointer ${
                    selectedImage === img
                      ? "border-[#5B4729]"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* --- Product Details & Interactions --- */}
          <div>
            <p className="text-sm text-gray-500 mb-2">MYARA ORGANICS</p>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            {/* BUG FIX: Removed fallback to product.price which would crash the page */}
            <p className="text-3xl text-gray-800 mb-6">
              {selectedVariant
                ? `Rs. ${selectedVariant.price.toFixed(2)}`
                : "Price not available"}
            </p>

            {/* Product Variants (Size) */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <p className="text-lg font-semibold mb-3">Size</p>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(variant)}
                      // CORRECTED: Using arbitrary values for colors
                      className={`px-5 py-2 border rounded-md transition-all duration-200 ${
                        selectedVariant && selectedVariant.name === variant.name
                          ? "bg-[#5B4729] text-white border-[#5B4729]"
                          : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="text-lg font-semibold mr-4">Quantity</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 rounded-l-md transition"
                >
                  −
                </button>
                <span className="px-5 py-2 text-lg border-x border-gray-300 bg-white">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 rounded-r-md transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart & Buy Now Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                // CORRECTED: Using arbitrary values for colors
                className="w-full bg-white text-[#5B4729] border-2 border-[#5B4729] py-3 rounded-lg hover:bg-[#5B4729] hover:text-white transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={product.availability === "Sold Out"}
              >
                Add to cart
              </button>
              <button
                onClick={handleBuyNow}
                // CORRECTED: Using arbitrary values for colors
                className="w-full bg-[#5B4729] text-white py-3 rounded-lg hover:bg-[#8A7256] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={product.availability === "Sold Out"}
              >
                Buy it now
              </button>
            </div>

            {product.availability === "Sold Out" && (
              <p className="text-red-600 font-semibold mt-4 text-center">
                This product is currently sold out.
              </p>
            )}

            {product.description && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* --- Why Choose Myara Section --- */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-8">
            Why Choose Myara over any other brand?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold mb-2">
                Bilona Method (The Artisanal Standard)
              </h3>
              <p className="text-sm text-gray-600">
                Our process involves churning curd, not cream, for pure and
                authentic ghee.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Direct Cream Method (The Industrial Shortcut)
              </h3>
              <p className="text-sm text-gray-600">
                Many brands use a direct cream method which is faster but
                compromises purity.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Machine Churned Cream (The Industrial Process)
              </h3>
              <p className="text-sm text-gray-600">
                This common industrial method often uses high heat, reducing
                nutritional value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
