'use client'

import { createProduct, deleteProduct, updateProduct } from "@/app/action";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { CiCircleRemove } from "react-icons/ci";
import ConfirmationModal from "@/components/ConfirmationModal";
import { IoMdAdd } from "react-icons/io";
import { MdUpdate } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
    id: number;
    title: string;
}
interface Product {
  id: number;
  name: string;
  price: number | "";
  stock: number | "";
  category_id: number | null;
  desc: string;
  color: string;
  accessories: string;
}
interface ProductListProps {
  products: Product[];
  categories: Category[];
}
export default function ProductList({ products: initialProducts, categories: initialCategories }: ProductListProps) {
    const { user, hasRole } = useAuth({ middleware: 'auth', role: 'admin' });
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [categories, setCategories] = useState<Category[]>(initialCategories);

    const [name, setName] = useState('');
    const [price, setPrice] = useState<number | "">("");
    const [category_id, setCategoryId] = useState<number | "">(0);
    const [desc, setDesc] = useState('');
    const [stock, setStock] = useState<number | "">("");
    const [color, setColor] = useState('');
    const [accessories, setAccessories] = useState('');

    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<number | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Store validation errors

    useEffect(() => {
      if (user !== undefined) {
          setIsLoading(false);
      }
    }, [user]); 
    if (!hasRole('admin')) {
      return <LoadingSpinner />
    }
    
    const resetForm = () => {
        setName('');
        setPrice(0);
        setColor('');
        setStock(0);
        setAccessories('');
        setCategoryId(0);
        setDesc('');
        setErrors({}); // Clear errors when resetting the form
    };
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        // Required fields
        if (!name.trim()) newErrors.name = "Name is required.";
        if (price === "") newErrors.price = "Price is required.";
        if (stock === "") newErrors.stock = "Stock is required.";
        if (accessories === "") newErrors.accessories = "Accessories is required.";
        if (!category_id) newErrors.categoryId = "Category is required.";
        if (!color.trim()) newErrors.color = "Color is required.";

        // Numeric validation
        if (price !== "" && (isNaN(Number(price)) || Number(price) <= 0)) {
            newErrors.price = "Price must be a positive number.";
        }
        if (stock !== "" && (isNaN(Number(stock)) || Number(stock) < 0)) {
            newErrors.stock = "Stock must be a non-negative number.";
        }
        // String length limits
        if (name.length > 100) newErrors.name = "Name must be less than 100 characters.";
        if (desc.length > 500) newErrors.desc = "Description must be less than 500 characters.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    }

    const openModal = (product: any) => {
        setSelectedProduct(product); // Store the selected product
        setName(product.name || '');
        setPrice(product.price || '');
        setCategoryId(product.category_id || "");
        setDesc(product.desc || '');
        setStock(product.stock || '');
        setColor(product.color || '');
        setAccessories(product.accessories || '');
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
        resetForm();
    };
    
    const openDeleteModal = (id: number) => { // Open the delete confirmation modal
        setProductToDelete(id);
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => { // Close the delete confirmation modal
        setProductToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleAddSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("handleAddSubmit called"); // Log statement to verify function call
        if (!validateForm()) {
            console.log("Form validation failed", errors); // Log validation errors
            return; // Stop if validation fails
        }
        const productData = {
            name,
            price,
            stock,
            category_id: category_id === "" ? 0 : Number(category_id), // Ensure it's a number or null
            desc,
            color,
            accessories
        };
        console.log("Product data to be sent:", productData); // Log product data
        try {
            const newProduct = await createProduct(productData); // Call API to create product and {[newProduct]: holds the API response.}
            // console.log("New product created:", newProduct); // Log the new product data received from API
            setProducts((prevProducts) => [newProduct, ...prevProducts]); // Update state immediately with new product
            resetForm();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error creating product:", error); // Log error
            alert((error as any).message);
        }
    };
    const handleUpdateSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!validateForm()) return; // Stop if validation fails
        const productData = {
            name,
            price,
            stock,
            category_id: category_id === "" ? 0 : Number(category_id), // Ensure it's a number or null
            desc,
        };
        try {
            await updateProduct(selectedProduct.id, productData);

            // Fetch the updated category title (optional, based on requirements)
            const categoryTitle = categories.find(cat => cat.id === productData.category_id)?.title || "Unknown";

            // Update the local product state with new data and category title
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === selectedProduct.id ? { ...product, ...productData, category_title: categoryTitle } : product
                )
            );
            console.log(productData)
            closeModal();
        } catch (error) {
            console.error(error);
            alert("Failed to update product.");
        }
    };
    const handleDeleteConfirm = async () => {
        if (productToDelete === null) return;

        try {
            await deleteProduct(productToDelete);
                setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== productToDelete)
            );
            // alert("Product deleted successfully!");
        } catch (error) {
            console.error(error);
            // alert("Failed to delete product.");
        } finally {
            closeDeleteModal();
        }
    };

    return (
        <>
        {isLoading && <LoadingSpinner />}
            <div className="p-4 sm:ml-64">
                <div className="border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">      
                            <label htmlFor="table-search" className="sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                                </div>
                                <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                            </div>

                            {/* Modal */}
                            <div>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="inline-flex items-center whitespace-nowrap text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                    <IoMdAdd />
                                    <span className="ml-2">New Product</span>
                                </button>
                                <AnimatePresence>
                                {
                                    isModalOpen && (
                                        <motion.div
                                            initial={{ opacity: 0 }} // Initial state (hidden)
                                            animate={{ opacity: 1 }} // Animate to visible
                                            exit={{ opacity: 0 }} // Animate to hidden when exiting
                                            transition={{ duration: 0.3 }} // Add a smooth transition
                                            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                                        >
                                            <motion.div
                                                initial={{ scale: 0.9, opacity: 0 }} // Initial state (scaled down and hidden)
                                                animate={{ scale: 1, opacity: 1 }} // Animate to full size and visible
                                                exit={{ scale: 0.9, opacity: 0 }} // Animate to scaled down and hidden when exiting
                                                transition={{ type: "spring", stiffness: 300, damping: 25 }} // Make the scaling smooth
                                                className="relative p-4 w-full max-w-2xl max-h-full"
                                            >
                                                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {selectedProduct ? "Edit Product" : "Add Product"}
                                                        </h3>
                                                        <button 
                                                            onClick={closeModal}
                                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    
                                                    <form className="p-4 md:p-5"
                                                        onSubmit={selectedProduct ? handleUpdateSubmit : handleAddSubmit}
                                                    >
                                                        
                                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                                            {/* name */}
                                                            <div className="col-span-2">
                                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                                                <input
                                                                    name="name"
                                                                    id="name"
                                                                    value={name}
                                                                    onChange={(e) => setName(e.target.value)}
                                                                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 
                                                                    ${
                                                                        errors.name ? "border-red-500" : ""
                                                                    }`}
                                                                    placeholder="Type product name" 
                                                                />
                                                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                                            </div>
                                                            {/* price */}
                                                            <div className="col-span-2 sm:col-span-1">
                                                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                                                <input
                                                                    name="price" 
                                                                    id="price"
                                                                    value={price}
                                                                    onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                                                                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 
                                                                        ${
                                                                            errors.price ? "border-red-500" : ""
                                                                        }`}
                                                                    placeholder="$2999" 
                                                                />
                                                                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                                                            </div>
                                                            {/* category */}
                                                            <div className="col-span-2 sm:col-span-1">
                                                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                                                <select
                                                                    id="category" 
                                                                    name="category"
                                                                    value={category_id}
                                                                    onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : 0)} // Convert value to number or set to 0
                                                                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                                                                        errors.categoryId ? "border-red-500" : ""
                                                                    }`}
                                                                >
                                                                    <option value={0}>Select category</option> {/* Ensure value is 0 for default option */}
                                                                    {categories.map((category) => (
                                                                        <option key={category.id} value={category.id}>{category.title}</option>
                                                                    ))}
                                                                </select>
                                                                {errors.categoryId && <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>}
                                                            </div>
                                                            {/* stock */}
                                                            <div className="col-span-2 sm:col-span-1">
                                                                <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                                                                <input
                                                                    name="stock" 
                                                                    id="stock"
                                                                    value={stock}        
                                                                    onChange={(e) => setStock(e.target.value === "" ? "" : Number(e.target.value))}
                                                                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                                                                        errors.stock ? "border-red-500" : ""
                                                                    }`}
                                                                    placeholder="Stock"
                                                                />
                                                                {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
                                                            </div>
                                                            {/* color */}
                                                            <div className="col-span-2 sm:col-span-1">
                                                                <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                                                                <select
                                                                    id="color" 
                                                                    name="color"
                                                                    value={color}
                                                                    onChange={(e) => setColor(e.target.value)}
                                                                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                                                                        errors.color ? "border-red-500" : ""
                                                                    }`}
                                                                >
                                                                    <option  value="">Select Color</option>
                                                                    <option value="Silver">Silver</option>
                                                                    <option value="Gold">Gold</option>
                                                                    <option value="Black">Black</option>
                                                                </select>
                                                                {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
                                                            </div>
                                                            {/* accessories */}
                                                            <div className="col-span-2 sm:col-span-1">
                                                                <label htmlFor="accessories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Accessories</label>
                                                                <input 
                                                                    type="text" 
                                                                    name="accessories" 
                                                                    id="accessories"
                                                                    onChange={(e) => setAccessories(e.target.value)}
                                                                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${
                                                                        errors.accessories ? "border-red-500" : ""
                                                                    }`} placeholder="Accessories" 
                                                                />
                                                                {errors.accessories && <p className="text-red-500 text-sm mt-1">{errors.accessories}</p>}
                                                            </div>
                                                            {/* Description */}
                                                            <div className="col-span-2">
                                                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                                                                <textarea 
                                                                    rows={4}
                                                                    id="description" 
                                                                    name="desc"
                                                                    value={desc}
                                                                    onChange={(e) => setDesc(e.target.value)}
                                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                    placeholder="Write product description here"
                                                                ></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end space-x-2">
                                                            <button type="button" onClick={closeModal} className="px-5 py-2.5 bg-gray-500 text-white rounded-lg" >
                                                                Cancel
                                                            </button>
                                                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                                
                                                                {selectedProduct ? <MdUpdate /> : <IoMdAdd />}
                                                                <span className="ml-2">{selectedProduct ? 'Update Product' : 'Add Product'}</span>
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    )
                                }
                                </AnimatePresence>
                            </div>
                        </div>

                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="p-4">
                                        <div className="flex items-center">
                                            <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Color
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Accessories
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Available
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Weight
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                            {
                                products.map((product: any) =>
                                    <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {product.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            Silver
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.category_title}
                                        </td>
                                        <td className="px-6 py-4">
                                            Yes
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.stock}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.price}
                                        </td>
                                        <td className="px-6 py-4">
                                            3.0 lb.
                                        </td>
                                        <td className="flex items-center px-6 py-4">
                                            <span className="pe-1 text-blue-600"><FaRegEdit /></span><button onClick={() => openModal(product)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                            <span className="ps-4 pe-1 text-red-600"><CiCircleRemove /></span><button onClick={() => openDeleteModal(product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                        <ConfirmationModal 
                            isOpen={isDeleteModalOpen}
                            onClose={closeDeleteModal}
                            onConfirm={handleDeleteConfirm}
                            title="Delete Product"
                            message="Are you sure you want to delete this product? This action cannot be undone."
                            isDeleting={false}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
