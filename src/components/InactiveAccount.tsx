'use client';

import { useAuth } from '@/hooks/auth';
export default function InactiveAccount() {
    const { user,logout } = useAuth({ middleware: "auth", status: "inactive" });
    console.log(`User status is ${user?.status}. Rendering inactive account page.`);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-red-600">
                    Account Inactive
                </h1>
                <p className="mt-4 text-center text-gray-600">
                    Your account is currently {user?.status}. Please contact support or wait until
                    your account is reactivated.
                </p>
                <div className='flex justify-center mt-8'>
                    <button
                        onClick={logout}
                        className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        </div>
    )
}
