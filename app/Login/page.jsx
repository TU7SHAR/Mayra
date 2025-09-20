"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleContinue = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (res.ok) {
      setStep("otp");
    } else {
      setError("Failed to send OTP. Please try again.");
    }
    setIsLoading(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp }),
    });
    if (res.ok) {
      router.push("/"); // Redirect to home page on success
    } else {
      const data = await res.json();
      setError(data.error || "An unknown error occurred.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Myara Logo" width={60} height={60} />
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {step === "email" ? (
          <form onSubmit={handleContinue}>
            {/* --- EMAIL FORM CONTENT WAS MISSING --- */}
            <h1 className="text-2xl font-bold text-center mb-2">Sign in</h1>
            <p className="text-gray-600 text-center mb-6">
              Enter your email to get a verification code
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
                disabled={isLoading}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#5B4729]"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5B4729] text-white py-2 rounded-md hover:bg-[#8A7256] transition duration-300 disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Continue"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify}>
            {/* --- OTP FORM CONTENT WAS MISSING --- */}
            <h1 className="text-2xl font-bold text-center mb-2">
              Check your email
            </h1>
            <p className="text-gray-600 text-center mb-6">
              A 6-digit code has been sent to <br /> <strong>{email}</strong>
            </p>
            <div className="mb-4">
              <label htmlFor="otp" className="sr-only">
                Verification Code
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
                required
                maxLength={6}
                disabled={isLoading}
                className="w-full px-4 py-2 border rounded-md text-center tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-[#5B4729]"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5B4729] text-white py-2 rounded-md hover:bg-[#8A7256] transition duration-300 disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setStep("email")}
                className="text-sm text-gray-500 hover:underline"
              >
                Use a different email
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
