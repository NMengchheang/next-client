interface CartItem {
  cart_id: number;
  product_name: string;
  price: number;
  quantity: number;
  category_name: string;
}

export const loadCart = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

export const storeCart = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const addItemToCart = (product: CartItem) => {
    let cart = loadCart();
    const existingItem = cart.find((item) => item.cart_id === product.cart_id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    storeCart(cart);
    window.dispatchEvent(new Event("storage"));
};

export const removeItemFromCart = (productId: number) => {
    let cart = loadCart();
    cart = cart.filter((item) => item.cart_id !== productId);
    storeCart(cart);
    window.dispatchEvent(new Event("storage"));
};

export const increaseQuantity = (productId: number) => {
    let cart = loadCart();
  
    cart = cart.map((item) =>
      item.cart_id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
  
    storeCart(cart);
};

export const decreaseQuantity = (productId: number) => {
    let cart = loadCart();
  
    cart = cart.map((item) =>
      item.cart_id === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter((item) => item.quantity > 0);
  
    storeCart(cart);
};
