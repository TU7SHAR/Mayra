"use client";

import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useDetectOutsideClick } from "../hooks/useDetectOutsideClick";

export default function ProductsPageClient({ initialProducts }) {
  const products = initialProducts;
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [availabilityFilter, setAvailabilityFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState({ from: "", to: "" });
  const [sortOrder, setSortOrder] = useState("featured");
  const availabilityDropdown = useDetectOutsideClick(false);
  const priceDropdown = useDetectOutsideClick(false);
  const sortDropdown = useDetectOutsideClick(false);

  useEffect(() => {
    let tempProducts = [...products];

    if (availabilityFilter.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        availabilityFilter.includes(product.availability)
      );
    }
    const fromPrice = parseFloat(priceFilter.from);
    const toPrice = parseFloat(priceFilter.to);
    if (!isNaN(fromPrice))
      tempProducts = tempProducts.filter((p) => p.price >= fromPrice);
    if (!isNaN(toPrice))
      tempProducts = tempProducts.filter((p) => p.price <= toPrice);

    switch (sortOrder) {
      case "featured":
        tempProducts.sort(
          (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        );
        break;
      case "best-selling":
        tempProducts.sort((a, b) => b.sales - a.sales);
        break;
      case "price-asc":
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      case "alpha-az":
        tempProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "alpha-za":
        tempProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "date-new":
        tempProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "date-old":
        tempProducts.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;
      default:
        break;
    }
    setFilteredProducts(tempProducts);
  }, [availabilityFilter, priceFilter, sortOrder]);
  const handleAvailabilityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAvailabilityFilter([...availabilityFilter, value]);
    } else {
      setAvailabilityFilter(
        availabilityFilter.filter((item) => item !== value)
      );
    }
  };

  const handleSortChange = (sortValue) => {
    setSortOrder(sortValue);
    sortDropdown.setIsActive(false);
  };

  const sortOptions = {
    featured: "Featured",
    "best-selling": "Best selling",
    "alpha-az": "Alphabetically, A-Z",
    "alpha-za": "Alphabetically, Z-A",
    "price-asc": "Price, low to high",
    "price-desc": "Price, high to low",
    "date-new": "Date, new to old",
    "date-old": "Date, old to new",
  };

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Products</h1>
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Filter:</span>

            {/* Availability Filter Dropdown */}
            <div className="relative">
              <button
                ref={availabilityDropdown.triggerRef}
                className="border px-3 py-1 rounded"
              >
                Availability
              </button>
              {availabilityDropdown.isActive && (
                <div
                  ref={availabilityDropdown.nodeRef}
                  className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 p-4"
                >
                  {/* --- CONTENT RESTORED --- */}
                  <div className="flex justify-between items-center mb-2">
                    <span>{availabilityFilter.length} selected</span>
                    <button
                      onClick={() => setAvailabilityFilter([])}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Reset
                    </button>
                  </div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value="In Stock"
                      onChange={handleAvailabilityChange}
                      checked={availabilityFilter.includes("In Stock")}
                    />
                    <span>In stock</span>
                  </label>
                  <label className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      value="Sold Out"
                      onChange={handleAvailabilityChange}
                      checked={availabilityFilter.includes("Sold Out")}
                    />
                    <span>Out of stock</span>
                  </label>
                </div>
              )}
            </div>

            {/* Price Filter Dropdown */}
            <div className="relative">
              <button
                ref={priceDropdown.triggerRef}
                className="border px-3 py-1 rounded"
              >
                Price
              </button>
              {priceDropdown.isActive && (
                <div
                  ref={priceDropdown.nodeRef}
                  className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10 p-4"
                >
                  {/* --- CONTENT RESTORED --- */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500">
                      The highest price is Rs. 2,999.00
                    </span>
                    <button
                      onClick={() => setPriceFilter({ from: "", to: "" })}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">₹</span>
                    <input
                      type="number"
                      placeholder="From"
                      value={priceFilter.from}
                      onChange={(e) =>
                        setPriceFilter({ ...priceFilter, from: e.target.value })
                      }
                      className="w-full border p-1 rounded"
                    />
                    <span className="text-gray-500">₹</span>
                    <input
                      type="number"
                      placeholder="To"
                      value={priceFilter.to}
                      onChange={(e) =>
                        setPriceFilter({ ...priceFilter, to: e.target.value })
                      }
                      className="w-full border p-1 rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sort Control */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <span className="text-sm text-gray-500 mr-2">Sort by:</span>
              <button
                ref={sortDropdown.triggerRef}
                className="border px-3 py-1 rounded w-48 text-left relative"
              >
                {sortOptions[sortOrder]}
                <span className="absolute right-2 top-1/2 -translate-y-1/2"></span>
              </button>
              {sortDropdown.isActive && (
                <div
                  ref={sortDropdown.nodeRef}
                  className="absolute top-full right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10"
                >
                  {Object.entries(sortOptions).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => handleSortChange(key)}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        sortOrder === key ? "font-bold" : ""
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="ml-4 text-sm text-gray-500">
              {filteredProducts.length} products
            </span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">
              No products match your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
