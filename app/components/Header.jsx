"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // State to hold user session
  const [isLoading, setIsLoading] = useState(true); // To handle loading state

  const pathname = usePathname();
  const router = useRouter();
  const { itemCount } = useCart();

  // Fetch the user session when the component loads or the route changes
  useEffect(() => {
    async function fetchSession() {
      // Don't re-fetch when the menu is toggled, only on navigation
      setIsLoading(true);
      const res = await fetch("/api/session");
      if (res.ok) {
        const data = await res.json();
        // Check if the session is active
        if (data.isLoggedIn) {
          setUser(data);
        } else {
          setUser(null);
        }
      }
      setIsLoading(false);
    }
    fetchSession();
  }, [pathname]);

  // Function to handle user logout
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null); // Clear the user state locally
    router.push("/"); // Redirect to home after logout
    router.refresh(); // Refresh to ensure server components also update
  };
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/Products" },
    { name: "Contact", href: "http://wa.me/+918053173029" },
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
          {/* Conditionally render Login or User Info/Logout */}
          {!isLoading &&
            (user ? (
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-600 hidden sm:block">
                  {user.email}
                </p>
                <button
                  onClick={handleLogout}
                  className="text-sm font-semibold text-gray-700 hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/Login" className="text-gray-600 hover:text-gray-900">
                <svg
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
            ))}

          <Link
            href="/Cart"
            className="relative text-gray-600 hover:text-gray-900"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
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
