"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/Products" },
    { name: "Contact", href: "http://wa.me/+919780400311" },
  ];

  return (
    <header className="bg-white py-4 px-8 shadow-md top-0 z-50 relative">
      <div className="container mx-auto grid grid-cols-3 items-center">
        {/* Left Column: Desktop Nav & Mobile Hamburger Menu */}
        <div className="flex justify-start">
          {/* Desktop Navigation (hidden on mobile) */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname.toLowerCase() === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`pb-1 font-medium text-gray-600 hover:text-gray-900 transition-colors ${
                    isActive
                      ? "border-b-2 border-yellow-800"
                      : "border-b-2 border-transparent"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Hamburger Menu Button (visible on mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden z-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              // Close Icon (X)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Center Column: Logo */}
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Myara Organics Logo"
              height={100}
              width={100}
              priority
            />
          </Link>
        </div>

        {/* Right Column: Icons */}
        <div className="flex justify-end items-center space-x-4">
          <Link href="#" className="text-gray-600 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link>
          <Link href="/Login" className="text-gray-600 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4">
          <div className="container mx-auto flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg text-gray-700 hover:text-yellow-800"
                onClick={() => setIsMenuOpen(false)} // Close menu on link click
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
