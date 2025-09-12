// lib/useCart.js
import { useState, useEffect } from "react";

export const useCart = () => {
  const [cart, setCart] = useState([]);

  // Load cart từ localStorage khi component mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  // Thêm sản phẩm vào giỏ
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (i) =>
          i.productId === item.productId &&
          i.selectedVariant?.id === item.selectedVariant?.id
      );

      let newCart = [...prevCart];
      if (existingIndex >= 0) {
        newCart[existingIndex].quantity += item.quantity;
      } else {
        newCart.push(item);
      }

      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  // Xóa sản phẩm khỏi giỏ
  const removeFromCart = (productId, variantId) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter(
        (i) => !(i.productId === productId && i.selectedVariant?.id === variantId)
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  // Tổng số lượng item trong giỏ
  const getTotalItems = () =>
    cart.reduce((acc, i) => acc + (i.quantity || 0), 0);

  // Tổng tiền
  const getSubtotal = () =>
    cart.reduce((acc, i) => acc + (i.productPrice || 0) * (i.quantity || 0), 0);

  return { cart, addToCart, removeFromCart, getTotalItems, getSubtotal };
};
