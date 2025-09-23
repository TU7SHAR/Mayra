"use client";

import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CheckoutPage() {
  const { cartItems, discount } = useCart();
  const router = useRouter();

  // State for form inputs
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
  });

  // Redirect user if their cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems, router]);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const finalTotal = cartTotal - discount.amount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we would proceed to payment (the Razorpay step)
    console.log("Form submitted, proceeding to payment with:", formData);
    alert("Next step: Payment Gateway!");
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
          {/* Left Column: Shipping Form */}
          <div className="lg:pr-8">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="w-full p-3 border rounded-md"
                />

                <h2 className="text-2xl font-semibold pt-6">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    required
                    className="w-full p-3 border rounded-md"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    required
                    className="w-full p-3 border rounded-md"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  required
                  className="w-full p-3 border rounded-md"
                />
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    required
                    className="w-full p-3 border rounded-md"
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    required
                    className="w-full p-3 border rounded-md"
                  />
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    placeholder="PIN code"
                    required
                    className="w-full p-3 border rounded-md"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  required
                  className="w-full p-3 border rounded-md"
                />
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-[#5B4729] text-white py-3 rounded-lg hover:bg-[#8A7256] transition text-lg font-semibold"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:pl-8 mt-12 lg:mt-0 bg-gray-50 p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="relative w-16 h-16">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="rounded-md object-cover border"
                      />
                      <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.variant}</p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t mt-6 pt-6">
              <div className="flex justify-between text-xl font-bold mt-4 border-t pt-4">
                <p>Total</p>
                <p>Rs. {finalTotal.toFixed(2)}</p>
              </div>
              {discount.amount > 0 && (
                <div className="flex justify-between text-lg mt-2 text-green-600">
                  <p>Discount ({discount.code})</p>
                  <p>- Rs. {discount.amount.toFixed(2)}</p>
                </div>
              )}
              <div className="flex justify-between text-lg mt-2">
                <p>Shipping</p>
                <p className="text-gray-500">Free</p>
              </div>
              <div className="flex justify-between text-xl font-bold mt-4 border-t pt-4">
                <p>Total</p>
                <p>Rs. {cartTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
