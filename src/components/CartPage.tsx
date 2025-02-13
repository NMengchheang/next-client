"use client";
import axios from "@/lib/axios";
import { Console } from "console";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";

interface CartItem {
    cart_id: number;
    product_name: string;
    price: number;
    quantity: number;
    category_name: string;
}

export default function CartPage() {
    // const [products, setProducts] = useState<Product[]>(mockProducts);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // get from route.ts api
    // const fetchCartItems = async () => {
    //     try {
    //         const response = await axios.get("/api/cart-items", {
    //             withCredentials: true,
    //         });
    //         setCartItems(response.data);
    //     } catch (error: any) {
    //         console.error("Error fetching cart items:", error.response?.data || error.message);
    //         toast.error(`Failed to fetch cart items: ${error.response?.data?.message || error.message}`);
    //     }
    // };
    
    const fetchCartItems = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/cart-items', {
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setCartItems(data);
        } catch (error: any) {
            console.error("Error fetching cart items:", error.message);
            toast.error(`Failed to fetch cart items: ${error.message}`);
        }
    };
    useEffect(() => {
        fetchCartItems();
    }, []);

    // Function to update quantity in the database
    const updateCartItemQuantity = async (cart_id: number, newQuantity: number) => {
        try {
            const response = await axios.put(`/api/cart-items/${cart_id}`, {
                quantity: newQuantity,
            });

            console.log("Response status:", response.status); // Log the status code
            console.log("Response status text:", response.statusText); // Log the status text

            // Update state with new cart quantity
            setCartItems((prevItems) =>
                prevItems.map((item) => (item.cart_id === cart_id ? { ...item, quantity: response.data.quantity } : item))
            );

        } catch (error: any) {
            console.error("Error updating cart item quantity:", error.message);
            toast.error(`Failed to update quantity: ${error.message}`);
        }
    };
    const handleIncreaseQuantity = (cart_id: number, quantity: number) => {
        updateCartItemQuantity(cart_id, quantity + 1);
    };
    const handleDecreaseQuantity = (cart_id: number, quantity: number) => {
        if (quantity > 1) {
            updateCartItemQuantity(cart_id, quantity - 1);
        } else {
            toast.warning("Quantity cannot be less than 1");
        }
    };

    const handleRemoveItem = async (cart_id: number) => {
        try {
            const response = await axios.delete(`/api/cart-items/${cart_id}`);

            setCartItems((prevItems) => prevItems.filter((item) => item.cart_id !== cart_id));
            toast.success("Item removed from cart");
        } catch (error: any) {
            console.error("Error removing cart item:", error.message);
            toast.error(`Failed to remove item: ${error.message}`);
        }
    };

    const totalPrice = cartItems.reduce((total, cart) => total + Number(cart.price) * cart.quantity, 0);

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center md:text-left">Your Cart</h1>

            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 md:p-6 space-y-6">
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.cart_id} className="flex flex-col md:flex-row items-center md:items-start justify-between border-b dark:border-gray-700 pb-4">
                            {/* Product Image and Name */}
                            <div className="flex items-center space-x-4 mb-4 md:mb-0 w-full md:w-1/3">
                                <div className="relative w-16 h-16 overflow-hidden rounded-lg flex-shrink-0">
                                    <Image
                                        src="/productImage/computer_1.webp"
                                        alt={item.product_name}
                                        layout="fill"
                                        className="object-contain"
                                    />
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white text-sm md:text-base break-words max-w-xs md:max-w-none">
                                    {item.product_name}
                                </span>
                            </div>

                            {/* Price */}
                            <div className="text-gray-900 dark:text-white text-sm md:text-base mb-4 md:mb-0">
                                <span className="text-sm text-gray-500 dark:text-gray-300">Per Item:</span>
                                <span className="font-medium">${Number(item.price).toFixed(2)}</span>
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center space-x-3 mb-4 md:mb-0">
                                <button onClick={() => handleDecreaseQuantity(item.cart_id, item.quantity)} className="text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-gray-300 transition duration-200">
                                    <FaMinus />
                                </button>
                                <span className="text-gray-900 dark:text-white">{item.quantity}</span>
                                <button onClick={() => handleIncreaseQuantity(item.cart_id, item.quantity)} className="text-gray-600 dark:text-white hover:text-gray-900 dark:hover:text-gray-300 transition duration-200">
                                    <FaPlus />
                                </button>
                            </div>

                            {/* Total */}
                            <div className="text-gray-900 dark:text-white text-sm md:text-base mb-4 md:mb-0">
                                <span className="text-sm text-gray-500 dark:text-gray-300">Total:</span>
                                <span className="font-medium">${(Number(item.price) * item.quantity).toFixed(2)}</span>
                            </div>

                            {/* Remove Button */}
                            <button onClick={() => handleRemoveItem(item.cart_id)} className="text-red-600 hover:text-red-800 transition duration-200">
                                <MdOutlineRemoveShoppingCart size={24} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Cart Summary */}
                <div className="space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="text-center text-gray-500 dark:text-gray-400">
                            <div className="text-lg font-medium">Your cart is empty. Start shopping to add items!</div>
                            <Link href="/products">
                                <button className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition duration-200 mt-4">
                                    Go to Shop
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="text-right space-y-4">
                                <div className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Total: <span className="text-2xl text-blue-600 dark:text-blue-400">${totalPrice.toFixed(2)}</span>
                                </div>
                                <button className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-all duration-300 focus:outline-none">
                                    Proceed to Checkout
                                </button>
                            </div>
                            <div className="text-center md:text-right">
                                <Link href="/products">
                                    <button className="w-full md:w-auto bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300">
                                        Continue Shopping
                                    </button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}