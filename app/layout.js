import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Subscription from "./components/Subscription";
import { CartProvider } from "./context/CartContext";
import { Analytics } from "@vercel/analytics/next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/layout.js

export const metadata = {
  title: {
    template: "%s | Myara Organics", // Creates titles like "Products | Myara Organics"
    default: "Myara Organics - Pure & Authentic Ghee and Oils", // Default title
  },
  description:
    "Discover premium A2 Cow Ghee and cold-pressed oils from Myara Organics, crafted with traditional methods for purity and taste.",
  openGraph: {
    title: "Myara Organics",
    description: "Pure & Authentic Ghee and Oils.",
    url: "https://www.myaraorganics.com/", // Replace with your actual domain
    siteName: "Myara Organics",
    images: [
      {
        url: "https://www.myaraorganics.com/og-image.png", // Create a social sharing image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <Header />
          <main>{children}</main> {/* Page content will be injected here */}
          <Subscription />
          <Footer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
