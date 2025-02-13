"use client"

import { useEffect, useState } from 'react';

type ProductListProps = {
    products: { 
        name: string; 
        price: number;
        category: string;
        description: string;
        color: string;
        accessories: string;
    }[]; // Adjust fields accordingly
};

export default function ProductList({ products }: ProductListProps) {

    const [name, setName] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [accessories, setAccessories] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const resetForm = () => {
        setName('');
        setPrice(0);
        setCategory('');
        setDescription('');
        setColor('');
        setAccessories('');
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log({ name, price, category, description, color, accessories });

        resetForm();
        setIsModalOpen(false);
    };
    
    return (
    <>
        <div className="p-4 sm:ml-64">
            <div className="border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                        
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                        </div>

                        {/* Modal */}
                        <div>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                New Product
                            </button>
                    
                            {
                                isModalOpen && (
                                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                                        <div className="relative p-4 w-full max-w-2xl max-h-full">
                                            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        Create New Product
                                                    </h3>
                                                    <button 
                                                        onClick={() => setIsModalOpen(false)}
                                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                                
                                                <form className="p-4 md:p-5"  onSubmit={handleSubmit}>
                                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                                        <div className="col-span-2">
                                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                                            <input 
                                                                type="text" 
                                                                name="name" 
                                                                id="name" 
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                                                        </div>
                                                        <div className="col-span-2 sm:col-span-1">
                                                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                                            <input 
                                                                type="number" 
                                                                name="price" 
                                                                id="price"
                                                                value={price}
                                                                onChange={(e) => setPrice(Number(e.target.value))}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
                                                        </div>
                                                        <div className="col-span-2 sm:col-span-1">
                                                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                                            <select
                                                                id="category" 
                                                                value={category}
                                                                onChange={(e) => setCategory(e.target.value)}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                                <option  value="" disabled>Select category</option>
                                                                <option value="TV">TV/Monitors</option>
                                                                <option value="PC">PC</option>
                                                                <option value="GA">Gaming/Console</option>
                                                                <option value="PH">Phones</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-span-2 sm:col-span-1">
                                                            <label htmlFor="accessories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Accessories</label>
                                                            <input 
                                                                type="text" 
                                                                name="accessories" 
                                                                id="accessories"
                                                                value={accessories}
                                                                onChange={(e) => setAccessories(e.target.value)}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Accessories" required />
                                                        </div>
                                                        <div className="col-span-2 sm:col-span-1">
                                                            <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                                                            <select
                                                                id="color" 
                                                                value={color}
                                                                onChange={(e) => setColor(e.target.value)}
                                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                                <option  value="" disabled>Select Color</option>
                                                                <option value="TV">Silver</option>
                                                                <option value="PC">White</option>
                                                                <option value="GA">Gold</option>
                                                                <option value="PH">Black</option>
                                                            </select>
                                                        </div>

                                                        <div className="col-span-2">
                                                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                                                            <textarea 
                                                                id="description" 
                                                                rows={4}
                                                                value={description}
                                                                onChange={(e) => setDescription(e.target.value)}
                                                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>                    
                                                        </div>
                                                    </div>
                                                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                                        Add new product
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
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
                                            {product.category}
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
                                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                            <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    </>
    );
}
