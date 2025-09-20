"use client";

import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = localStorage.getItem("cartItems");
    if (items) setCartItems(JSON.parse(items));
  }, []);

  useEffect(() => {
    if (cartItems.length >= 0) {
      // Should update even when cart is empty
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (product, variant, quantity) => {
    const itemIdentifier = product.id + variant.name;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemIdentifier);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === itemIdentifier
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: itemIdentifier,
            productId: product.id,
            name: product.name,
            variant: variant.name,
            price: variant.price,
            image: product.images[0],
            quantity,
          },
        ];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
