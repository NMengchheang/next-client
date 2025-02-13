'use client'
import { useState } from 'react';
import mockProducts from "@/mockData/mockproduct"
import Image from 'next/image';
import Link from 'next/link';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}

export default function HomePage() {

    const [products, setProducts] = useState<Product[]>(mockProducts); // Type the state

    return (
        <div className="bg-gray-100">
            {/* Hero Section */}
            <section className="relative bg-blue-600 text-white py-20 px-6 text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to Our Store</h1>
                <p className="text-lg mb-6">Discover the best products curated just for you</p>
                <Link href="/products">
                    <button className="bg-white text-blue-600 px-6 py-2 font-semibold rounded hover:bg-gray-200">
                        Shop Now
                    </button>
                </Link>
            </section>
    
            {/* Categories Section */}
            <section className="py-16 px-6">
                <h2 className="text-gray-700 text-2xl font-bold text-center mb-8">Shop by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <img src="/path-to-category-image1.jpg" alt="Category 1" className="w-full rounded-lg mb-4" />
                        <h3 className="font-semibold text-lg">Category 1</h3>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <img src="/path-to-category-image2.jpg" alt="Category 2" className="w-full rounded-lg mb-4" />
                        <h3 className="font-semibold text-lg">Category 2</h3>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4 text-center">
                        <img src="/path-to-category-image3.jpg" alt="Category 3" className="w-full rounded-lg mb-4" />
                        <h3 className="font-semibold text-lg">Category 3</h3>
                    </div>
                </div>
            </section>
    
            {/* Featured Products Section */}
            <section className="py-16 px-6 bg-gray-200">
                <h2 className="text-gray-700 text-2xl font-bold text-center mb-8">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {products
                    .sort((a, b) => b.price - a.price) // Sort products by price (high to low)
                    .slice(0, 3)
                    .map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
                            <div 
                                className="relative w-full h-64 overflow-hidden rounded-t-lg bg-gray-100 flex items-center justify-center"
                            >
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-contain"
                                    // className="object-cover"
                                />
                            </div>
                            <div>
                                <a href="#" className="text-lg font-semibold leading-tight text-gray-700 hover:underline dark:text-white">{product.name}</a>
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-600 dark:text-white">
                                    <span className="line-through"> {(product.price + 10).toFixed(2)} </span>
                                </p>
                                <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">${(product.price).toFixed(2)}</p>
                            </div>
                            <div className="mt-6 flex items-center gap-2.5">
                                <button type="button" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700">
                                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6C6.5 1 1 8 5.8 13l6.2 7 6.2-7C23 8 17.5 1 12 6Z"></path>
                                    </svg>
                                </button>
                                <button type="button" className="bg-blue-700  inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium  text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7h-1M8 7h-.688M13 5v4m-2-2h4" />
                                    </svg>
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
    
            {/* Testimonials Section */}
            <section className="py-16 px-6">
                <h2 className="text-gray-700 text-2xl font-bold text-center mb-8">What Our Customers Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-gray-700 mb-4">&ldquo;Amazing products and great service!&rdquo;</p>
                        <p className="font-semibold">- John Doe</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-4">
                        <p className="text-gray-700 mb-4">&ldquo;I love the quality of the products!&rdquo;</p>
                        <p className="font-semibold">- Jane Smith</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
