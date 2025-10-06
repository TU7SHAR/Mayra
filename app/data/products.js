export const products = [
  {
    id: 1,
    name: "A2 Cow Ghee",
    slug: "a2-cow-ghee",
    // price: 599.0, // This is removed
    images: ["/ghee.jpg", "/ghee2.png","/g3.jpg","/ghee3.png"],
    availability: "In Stock",
    isFeatured: true,
    sales: 150,
    createdAt: "2025-09-15T10:00:00Z",
    // The variants array is added
    variants: [
      { name: "1 Litre", price: 2499.0 },
      { name: "500 ml", price: 1499.0 },
      { name: "175 ml", price: 499.0 },
    ],
  },
  {
    id: 2,
    name: "Cold Pressed Mustard Oil",
    slug: "cold-pressed-mustard-oil",
    // price: 220.0, // This is removed
    images: ["/mustard-oil.jpg", "/mustard-oil.jpg", "/mustard-oiljpg"],
    availability: "Sold Out",
    isFeatured: true,
    sales: 95,
    createdAt: "2025-09-17T12:00:00Z",
    // The variants array is added
    variants: [
      { name: "1 Litre", price: 350.0 },
      { name: "500 ml", price: 175.0 },
      { name: "200 ml", price: 95.0 },
    ],
  },
];
