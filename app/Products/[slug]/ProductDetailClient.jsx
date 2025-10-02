"use client";

import { useState, use, useEffect } from "react";
import Image from "next/image";
import { useCart } from "../../context/CartContext";

export default function ProductDetailClient({ product }) {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants ? product.variants[0] : null
  );
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert("Please select a size/variant.");
      return;
    }
    addToCart(product, selectedVariant, quantity);
    alert(
      `Added ${quantity} of ${product.name} (${selectedVariant.name}) to cart!`
    );
  };

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div>
            <div className="relative w-full h-96 mb-4">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
            <div className="flex space-x-4">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className={`relative w-20 h-20 border-2 rounded-lg cursor-pointer ${selectedImage === img ? "border-[#5B4729]" : "border-transparent"}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} thumbnail`}
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl text-gray-800 mb-6">
              {selectedVariant
                ? `Rs. ${selectedVariant.price.toFixed(2)}`
                : "Select a size"}
            </p>
            {product.variants && (
              <div className="mb-6">
                <p className="text-lg font-semibold mb-3">Size</p>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-5 py-2 border rounded-md transition-all ${selectedVariant?.name === variant.name ? "bg-[#5B4729] text-white border-[#5B4729]" : "bg-white text-gray-700"}`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center mb-6">
              <span className="text-lg font-semibold mr-4">Quantity</span>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-4 py-2 text-lg"
                >
                  -
                </button>
                <span className="px-4 py-2 text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-4 py-2 text-lg"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#5B4729] text-white py-3 rounded-lg hover:bg-[#8A7256] transition"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
