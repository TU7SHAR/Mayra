"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [step, setStep] = useState("email"); // 'email' or 'otp'
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleContinue = (e) => {
    e.preventDefault();
    // TODO: Add backend logic here to send OTP to the user's email
    console.log(`Sending OTP to ${email}...`);
    setStep("otp"); // Move to the next step
  };

  const handleVerify = (e) => {
    e.preventDefault();
    // TODO: Add backend logic here to verify the OTP
    console.log(`Verifying OTP ${otp} for email ${email}...`);
    // On success, you would redirect the user:
    // router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="Myara Logo" width={60} height={60} />
        </div>

        {step === "email" && (
          <form onSubmit={handleContinue}>
            <h1 className="text-2xl font-bold text-center mb-2">Sign in</h1>
            <p className="text-gray-600 text-center mb-6">
              Enter your email and we’ll send you a verification code
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
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Continue
            </button>
            <div className="text-center mt-4">
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:underline"
              >
                Privacy policy
              </Link>
            </div>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerify}>
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
                className="w-full px-4 py-2 border rounded-md text-center tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Verify
            </button>
            <div className="text-center mt-4">
              <button
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
