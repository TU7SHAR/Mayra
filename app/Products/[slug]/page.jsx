"use client";

import { useState, use } from "react";
import { products } from "@/app/data/products"; // Make sure this path is correct
import Image from "next/image";
import { notFound } from "next/navigation";

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const product = products.find((p) => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // State for the interactive elements
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  return (
    <div className="bg-gray-50 py-12">
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
              />
            </div>
            <div className="flex space-x-4">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className={`relative w-20 h-20 border-2 rounded-lg cursor-pointer ${
                    selectedImage === img
                      ? "border-yellow-800"
                      : "border-transparent"
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

          {/* --- Product Details --- */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl text-gray-800 mb-6">
              Rs. {product.price.toFixed(2)}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="mr-4">Quantity</span>
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

            {/* Add to Cart Button */}
            <button className="w-full text-yellow-800 bg-white py-3 rounded-lg hover:bg-yellow-900 transition duration-300">
              Add to cart
            </button>
            <button className="w-full bg-yellow-800 text-white py-3 rounded-lg hover:bg-yellow-900 transition duration-300">
              Buy It Now!!
            </button>
          </div>
        </div>

        {/* --- Detailed Info Section (as per your screenshot) --- */}
        <div className="mt-16 pt-8 border-t">
          <h2 className="text-2xl font-bold text-center mb-8">
            Why Choose Myara over any other brand?
          </h2>
          {/* This section can be built out with more dynamic data later */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="font-semibold mb-2">
                Bilona Method (The traditional process)
              </h3>
              <p className="text-sm text-gray-600">
                Our process involves churning curd, not cream...
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Direct Cream Method (The traditional process)
              </h3>
              <p className="text-sm text-gray-600">
                Many brands use a direct cream method which is faster but...
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">
                Machine Churned Cream (The industrial process)
              </h3>
              <p className="text-sm text-gray-600">
                This is the most common industrial method that compromises...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
