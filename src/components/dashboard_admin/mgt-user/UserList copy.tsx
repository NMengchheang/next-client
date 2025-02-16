'use client'

// import { createUser, deleteUser, updateUser } from "@/app/action";
import ConfirmationModal from "@/components/ConfirmationDeleteModal";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
}

interface UserListProps {
    users: User[];
  }

export default function UserList({ users: initialUsers }: UserListProps) {
    const { user, hasRole } = useAuth({ middleware: 'auth', role: 'admin' });
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [userToDelete, setUserToDelete] = useState<number | null>(null);
    const [pendingChange, setPendingChange] = useState<{ id: number, field: string, newValue: string } | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (user !== undefined) {
            setIsLoading(false);
        }
    }, [user]);
    if (!hasRole('admin')) {
        return <LoadingSpinner />
    }

    const openDeleteModal = (id: number) => {
        setUserToDelete(id);
        setIsDeleteModalOpen(true);
    };
    const closeDeleteModal = () => {
        setUserToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleDeleteConfirm = async () => {
        
    }

    const openConfirmModal = (id: number, field: string, newValue: string) => {
        setPendingChange({ id, field, newValue });
        setIsConfirmModalOpen(true);
    };

    const closeConfirmModal = () => {
        setPendingChange(null);
        setIsConfirmModalOpen(false);
    };

    const handleRoleChange = (id: number, newRole: string) => {
        openConfirmModal(id, 'role', newRole);
    };

    const handleStatusChange = (id: number, newStatus: string) => {
        openConfirmModal(id, 'status', newStatus);
    };

    const applyChange = async () => {
        if (pendingChange) {
            const { id, field, newValue } = pendingChange;
            setUsers(users.map(user => 
                user.id === id ? { ...user, [field]: newValue } : user
            ));
            // Perform the update logic here (e.g., API call to update user data)
            closeConfirmModal();
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
                                        User Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>

                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                            {
                                users.map((user: any, index: number) =>
                                    <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                {index+1}
                                            </div>
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {user.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-1">
                                            <select 
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                className="bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="user">User</option>
                                                {/* Add more roles as needed */}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select 
                                                value={user.status}
                                                onChange={(e) => handleStatusChange(user.id, e.target.value)}
                                                className="bg-gray-50 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                                {/* Add more statuses as needed */}
                                            </select>
                                        </td>
                                        <td className="flex items-center px-6 py-4">
                                            <span className="ps-4 pe-1 text-red-600"></span><button  onClick={() => openDeleteModal(user.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
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
                            title="Delete User"
                            message="Are you sure you want to delete this user? This action cannot be undone."
                            isDeleting={isDeleting}
                            isUpdating={false}
                        />

                        <ConfirmationModal
                            isOpen={isConfirmModalOpen}
                            onClose={closeConfirmModal}
                            onConfirm={applyChange}
                            title="Confirm Action"
                            message="Are you sure you want to proceed?"
                            isDeleting={false}
                            isUpdating={false}
                        />
                    </div>
                </div>
            </div>
    </>
  )
}
