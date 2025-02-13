"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "@/lib/axios";

interface CartContextType {
  itemCount: number;
  fetchCartCount: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

//*****================================================================================//
// This stores the cart count and provides a fetchCartCount function to update it.
//*****================================================================================//

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [itemCount, setItemCount] = useState(0);
  const fetchCartCount = async () => {
    try {
      
      const response = await axios.get("/api/cart/count", { withCredentials: true });
      if (response.status === 200) {
        setItemCount(response.data.count);
      } else if (response.status === 401) {
        setItemCount(0);
      } else {
        console.error("Error fetching cart count:", response.statusText);
      }
      
    } catch (error) {
      // If there's an error (e.g., network error), set itemCount to 0
      setItemCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ itemCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};