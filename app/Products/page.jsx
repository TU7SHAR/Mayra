import { products } from "../../app/data/products";
import ProductPageClient from "./ProductPageClient"; // 1. Import your new client component

export const metadata = {
  title: "All Products",
  description:
    "Browse our complete collection of A2 Cow Ghee, cold-pressed oils, and other authentic organic products.",
};

export default function ProductsPage() {
  return <ProductPageClient initialProducts={products} />;
}
