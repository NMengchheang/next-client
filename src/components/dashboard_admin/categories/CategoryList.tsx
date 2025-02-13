'use client'

import { createCategory, deleteCategory, updateCategory } from "@/app/action";
import ConfirmationModal from "@/components/ConfirmationModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/auth";
import { error } from "console";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io"
import { MdUpdate } from "react-icons/md";

interface Category {
    id: number;
    title: string;
    desc: string;
}

interface CategoryListProps {
    categories: Category[];
  }

export default function CategoryList({ categories: initialCategories }: CategoryListProps) {
    const { user, hasRole } = useAuth({ middleware: 'auth', role: 'admin' });
    const [isLoading, setIsLoading] = useState(true);

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

    useEffect(() => {
        if (user !== undefined) {
            setIsLoading(false);
        }
    }, [user]);
    if (!hasRole('admin')) {
        return <LoadingSpinner />
    }
    const resetForm = () => {
        setTitle('');
        setDesc('');
    };
    
    const openModal = (category: any) => {
        setSelectedCategory(category);
        setTitle(category.title || '');
        setDesc(category.desc || '');
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCategory(null);
        resetForm();
    };
    const openDeleteModal = (id: number) => { // Open the delete confirmation modal
        setCategoryToDelete(id);
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => { // Close the delete confirmation modal
        setCategoryToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleAddSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const categoryData = {
            title,
            desc
        };
        try {
            const newCategory = await createCategory(categoryData);
            setCategories((prevCategories) => [newCategory, ...prevCategories]);
            resetForm();
            setIsModalOpen(false);
        } catch (error) {
            alert((error as any).message);
        }
    }
    const handleUpdateSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const categoryData = {
            title,
            desc
        };
        try {
            await updateCategory(selectedCategory.id, categoryData);
            setCategories((prevCategories) =>
                prevCategories.map((category) =>
                    category.id === selectedCategory.id ? { ...category, ...categoryData } : category
                )
            );
            closeModal();
        } catch (error) {
            alert((error as any).message);
        }
    }
    const handleDeleteConfirm = async () => {
        if (categoryToDelete === null) return;

        try {
            await deleteCategory(categoryToDelete);
            setCategories((prevCategories) =>
                prevCategories.filter((category) => category.id !== categoryToDelete)
            );
            // alert("Product deleted successfully!");
        } catch (error) {
            console.error(error);
            // alert("Failed to delete product.");
        } finally {
            closeDeleteModal();
        }
    }

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
                                    <span className="ml-2">New Category</span>
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
                                                className="relative p-4 w-full max-w-2xl max-h-full">
                                                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                            {selectedCategory ? "Edit Product" : "Add Product"}
                                                        </h3>
                                                        <button 
                                                            onClick={closeModal}
                                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    
                                                    <form className="p-4 md:p-5" onSubmit={selectedCategory ? handleUpdateSubmit : handleAddSubmit}>
                                                        
                                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                                            {/* name */}
                                                            <div className="col-span-2">
                                                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title Category</label>
                                                                <input
                                                                    name="title"
                                                                    id="title"
                                                                    value={title}
                                                                    onChange={(e) => setTitle(e.target.value)}
                                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                                    placeholder="Type Title Category" 
                                                                />
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
                                                                {selectedCategory ? <MdUpdate /> : <IoMdAdd />}
                                                                <span className="ml-2">{ selectedCategory ? 'Update Product' : 'Add Product'}</span>
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
                                            No
                                        </div>
                                    </th>
                                    
                                    <th scope="col" className="px-6 py-3">
                                        Category Tittle
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                            {
                                categories.map((category: any, index: number) =>
                                    <tr key={category.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                {index+1}
                                            </div>
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {category.title}
                                        </th>
                                        <td className="px-6 py-4">
                                            {category.desc}
                                        </td>
                                        <td className="flex items-center px-6 py-4">
                                            <span className="pe-1 text-blue-600"></span><button onClick={() => openModal(category)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                                            <span className="ps-4 pe-1 text-red-600"></span><button  onClick={() => openDeleteModal(category.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
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
                            title="Delete Category"
                            message="Are you sure you want to delete this category? This action cannot be undone."
                            isDeleting={false}
                        />
                    </div>
                </div>
            </div>
    </>
  )
}
