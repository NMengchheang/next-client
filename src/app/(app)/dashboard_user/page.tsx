'use client'

import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react';

export default function AdminPage() {
    const { user, hasRole } = useAuth({ middleware: 'auth', role: 'user' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
            if (user !== undefined) {
                setIsLoading(false);
            }
        }, [user]);
    
    if (!hasRole('user')) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
            </div>
        );
    }

    return (
        <>
            {
                isLoading &&  (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
                    </div>
                )
            }

            {
                !isLoading && (
                    <div className="flex items-center justify-center min-h-screen bg-gray-100">
                        <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
                            <h1 className="text-2xl font-bold text-center text-blue-600">
                                Account User
                            </h1>
                            <p className="mt-4 text-center text-gray-600">
                                Welcome {user.name} to the user dashboard.
                            </p>
                        </div>
                    </div>
                )
            }
        </>
    );
}

