import { products } from "../../data/products";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
