"use client";

import { signIn } from "next-auth/react"; // Import from next-auth/react
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // To give user feedback

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Sending your sign-in link...");
    try {
      // This calls the NextAuth backend we just created
      await signIn("resend", { email, redirect: false });
      setMessage(
        `A sign-in link has been sent to ${email}. Please check your inbox.`
      );
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Sign in error", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Myara Logo" width={60} height={60} />
        </div>

        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-center mb-2">Sign in</h1>
          <p className="text-gray-600 text-center mb-6">
            Enter your email to receive a secure sign-in link
          </p>
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5B4729]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#5B4729] text-white py-2 rounded-md hover:bg-[#8A7256] transition duration-300"
          >
            Continue with Email
          </button>

          {message && (
            <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
          )}

          <div className="text-center mt-4">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:underline"
            >
              Privacy policy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
