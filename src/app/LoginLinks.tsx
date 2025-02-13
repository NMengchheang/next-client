'use client';

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function LoginLinks() {
    const { user, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isUserChecked, setIsUserChecked] = useState(false); // Track if user has been checked
    const { itemCount } = useCart(); // Get cart count from context

    useEffect(() => {
        // Simulate a user status check with a timer
        const timer = setTimeout(() => {
            setIsUserChecked(true); // Mark user check as done after a set time
            setIsLoading(false); // Stop the loading after the user check
        }, 1000); // Adjust this timeout to simulate your loading duration

        return () => clearTimeout(timer); // Clean up the timer
    }, [user]);

    return (
        <>
            {
                isLoading && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 transition-opacity duration-300">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
                    </div>
                )
            }
            {
                !isLoading && isUserChecked && (
                    <></>
                )
            }

            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image
                            width={64} 
                            height={64} 
                            src="https://flowbite.com/docs/images/logo.svg" 
                            className="h-8 me-3" 
                            alt="FlowBite Logo" 
                        />
                    </a>

                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src="favicon.ico" alt="user photo" />
                        </button>
                        <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                            {
                                user ? (
                                    <>
                                        { user.status === 'active' &&
                                            <>
                                                <div className="px-4 py-3">
                                                    <span className="block text-sm text-gray-900 dark:text-white">{ user.name}</span>
                                                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{ user.email }</span>
                                                </div>
                                            
                                                <ul className="py-2" aria-labelledby="user-menu-button">
                                                    <li>
                                                        <Link href={ user.role === 'admin' ? '/dashboard_admin' : '/dashboard_user'} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</Link>
                                                    </li>
                                                    <li>
                                                        <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                                                    </li>
                                                </ul>
                                            </>
                                        }
                                        { user.status === 'inactive' &&
                                            <>
                                                <ul className="py-2" aria-labelledby="user-menu-button">
                                                    <li>
                                                        <Link href="/inactiveaccount" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Account Suspended</Link>
                                                    </li>
                                                    <li>
                                                        <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Login</button>
                                                    </li>
                                                </ul>
                                            </>
                                        }
                                    </>
                                ) : (
                                    <>
                                        <ul className="py-2" aria-labelledby="user-menu-button">
                                            <li>
                                                <Link href="/login" className="block py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white px-7 pe-16">Login</Link>
                                            </li>
                                            <hr />
                                            <li>
                                                <Link href="/register" className="block py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white px-7 pe-16">Register</Link>
                                            </li>
                                        </ul>
                                    </>
                                )
                            }
                        </div>
                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                            <ul className="flex space-x-4 flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <Link href="/" 
                                        className="flex items-center py-2 px-3 rounded-sm 
                                            text-gray-900 dark:text-white 
                                            hover:bg-blue-600 hover:text-white 
                                            dark:hover:bg-blue-700 dark:hover:text-white 
                                            active:bg-blue-800 active:text-white 
                                            transition-all duration-300 ease-in-out 
                                            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none 
                                            hover:scale-105 hover:shadow-lg cursor-pointer" 
                                            aria-current="page"
                                    >Home</Link>
                                </li>
                                <li>
                                    <Link
                                        href="/products"
                                        className="flex items-center py-2 px-3 rounded-sm 
                                                text-gray-900 dark:text-white 
                                                hover:bg-blue-600 hover:text-white 
                                                dark:hover:bg-blue-700 dark:hover:text-white 
                                                active:bg-blue-800 active:text-white 
                                                transition-all duration-300 ease-in-out 
                                                focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none 
                                                hover:scale-105 hover:shadow-lg cursor-pointer"
                                    >
                                        Product
                                    </Link>
                                </li>


                                <li>
                                    <Link 
                                        href="/about" 
                                        className="flex items-center py-2 px-3 rounded-sm 
                                            text-gray-900 dark:text-white 
                                            hover:bg-blue-600 hover:text-white 
                                            dark:hover:bg-blue-700 dark:hover:text-white 
                                            active:bg-blue-800 active:text-white 
                                            transition-all duration-300 ease-in-out 
                                            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none 
                                            hover:scale-105 hover:shadow-lg cursor-pointer"
                                    >About</Link>
                                </li>
                                <li>
                                    <Link href="#"
                                        className="flex items-center py-2 px-3 rounded-sm 
                                            text-gray-900 dark:text-white 
                                            hover:bg-blue-600 hover:text-white 
                                            dark:hover:bg-blue-700 dark:hover:text-white 
                                            active:bg-blue-800 active:text-white 
                                            transition-all duration-300 ease-in-out 
                                            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none 
                                            hover:scale-105 hover:shadow-lg cursor-pointer"
                                    >Services</Link>
                                </li>
                                <li>
                                    <Link href="#" 
                                        className="flex items-center py-2 px-3 rounded-sm 
                                            text-gray-900 dark:text-white 
                                            hover:bg-blue-600 hover:text-white 
                                            dark:hover:bg-blue-700 dark:hover:text-white 
                                            active:bg-blue-800 active:text-white 
                                            transition-all duration-300 ease-in-out 
                                            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none 
                                            hover:scale-105 hover:shadow-lg cursor-pointer"
                                    >Pricing</Link>
                                </li>
                                <li>
                                    <Link href="#" 
                                        className="flex items-center py-2 px-3 rounded-sm 
                                        text-gray-900 dark:text-white 
                                        hover:bg-blue-600 hover:text-white 
                                        dark:hover:bg-blue-700 dark:hover:text-white 
                                        active:bg-blue-800 active:text-white 
                                        transition-all duration-300 ease-in-out 
                                        focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none 
                                        hover:scale-105 hover:shadow-lg cursor-pointer"
                                    >Contact</Link>
                                </li>
                                <li>
                                    <Link
                                        href="/cart"
                                        className="flex items-center py-2 px-3 rounded-sm 
                                            text-gray-900 dark:text-white 
                                            hover:bg-blue-600 hover:text-white 
                                            dark:hover:bg-blue-700 dark:hover:text-white 
                                            active:bg-blue-800 active:text-white 
                                            transition-all duration-300 ease-in-out 
                                            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none 
                                            hover:scale-105 hover:shadow-lg cursor-pointer"
                                    >
                                        <span className="ml-2 text-gray-900 dark:text-white">Cart</span>
                                        <div className="relative flex items-center">
                                            <svg
                                                className="w-6 h-6 text-blue-700 dark:text-blue-300"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.4"
                                                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                                                />
                                            </svg>
                                            {itemCount > 0 && (
                                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
                                                    {itemCount}
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                </li>


                                {
                                    user ? (
                                        <>
                                            { user.status === 'inactive' &&
                                                <>
                                                    <li>
                                                        <button onClick={logout} className="flex items-center py-2 px-3 rounded-sm hover:bg-blue-100 dark:hover:bg-blue-900 transition duration-300 ml-2 text-gray-900 dark:text-white">Login</button>
                                                    </li>
                                                    <li>
                                                        <button  onClick={logout} className="flex items-center py-2 px-3 rounded-sm hover:bg-blue-100 dark:hover:bg-blue-900 transition duration-300 ml-2 text-gray-900 dark:text-white">Register</button>
                                                    </li>
                                                </>
                                            }
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <a href="/login" 
                                                    className="flex items-center py-2 px-3 rounded-sm 
                                                        text-gray-900 dark:text-white 
                                                        hover:bg-blue-600 hover:text-white 
                                                        dark:hover:bg-blue-700 dark:hover:text-white 
                                                        active:bg-blue-800 active:text-white 
                                                        transition-all duration-300 ease-in-out 
                                                        focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none 
                                                        hover:scale-105 hover:shadow-lg cursor-pointer"
                                                >Login</a>
                                            </li>
                                            <li>
                                                <a href="/register" 
                                                    className="flex items-center py-2 px-3 rounded-sm 
                                                    text-gray-900 dark:text-white 
                                                    hover:bg-blue-600 hover:text-white 
                                                    dark:hover:bg-blue-700 dark:hover:text-white 
                                                    active:bg-blue-800 active:text-white 
                                                    transition-all duration-300 ease-in-out 
                                                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none 
                                                    hover:scale-105 hover:shadow-lg cursor-pointer"
                                                >Register</a>
                                            </li>
                                        </>
                                    )
                                }
                            </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
