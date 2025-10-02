import Link from "next/link";

export default function FailedPage() {
  return (
    <div className="container mx-auto text-center py-20">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed</h1>
      <p className="text-gray-600 mb-8">
        There was an issue with your payment. Please try again.
      </p>
      <Link
        href="/cart"
        className="bg-[#5B4729] text-white py-3 px-8 rounded-lg hover:bg-[#8A7256] transition"
      >
        Back to Cart
      </Link>
    </div>
  );
}
