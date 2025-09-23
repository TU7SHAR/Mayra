"use client";
import { react, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/app/data/products";
import ProductCard from "@/app/components/ProductCard";

export default function CartPage() {
  const { cartItems, discount, applyDiscount, removeFromCart, updateQuantity } =
    useCart();

  const [discountInput, setDiscountInput] = useState("");
  const [discountMessage, setDiscountMessage] = useState("");

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const finalTotal = cartTotal - discount.amount;
  const handleApplyDiscount = () => {
    const result = applyDiscount(discountInput);
    setDiscountMessage(result.message);
  };
  if (cartItems.length === 0) {
    const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 3);
    return (
      <div className="bg-white">
        <div className="container mx-auto text-center py-20 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-24 w-24 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-6">
            Your cart is empty
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Looks like you haven't added anything yet.
          </p>
          <Link
            href="/Products"
            className="mt-8 inline-block bg-[#5B4729] text-white py-3 px-8 rounded-lg hover:bg-[#8A7256] transition duration-300 text-md font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="border-t pt-12">
            <h2 className="text-2xl font-bold text-center mb-8">
              Top Picks For You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-4 rounded-lg shadow-sm gap-4"
              >
                <div className="flex items-center w-full sm:w-auto">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-grow ml-4">
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.variant}</p>
                    <p className="text-md font-semibold sm:hidden">
                      Rs. {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end sm:space-x-8 mt-4 sm:mt-0">
                  <p className="hidden sm:block text-md font-semibold w-20 text-center">
                    Rs. {item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="border h-8 w-8 rounded"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="border h-8 w-8 rounded"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold w-24 text-right">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className="w-16 text-right">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={discountInput}
              onChange={(e) => setDiscountInput(e.target.value)}
              placeholder="Discount code"
              className="w-full p-2 border rounded-md"
            />
            <button
              onClick={handleApplyDiscount}
              className="bg-[#5B4729] text-white px-4 rounded-md hover:bg-gray-300 whitespace-nowrap"
            >
              Apply
            </button>
          </div>{" "}
          {discount.amount > 0 && (
            <div className="flex justify-between mb-2 text-green-600">
              <span>Discount ({discount.code})</span>
              <span>- Rs. {discount.amount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>Rs. {cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 text-gray-600">
            <span>Taxes & Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>Rs. {finalTotal.toFixed(2)}</span>
          </div>
          <Link href="/Checkout">
            <button className="w-full bg-[#5B4729] text-white py-3 mt-6 rounded-lg hover:bg-[#8A7256] transition">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
