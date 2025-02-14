"use client";

import useSWR from 'swr'
import axios from '@/lib/axios'
import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// *** Added explicit types for props and functions.
interface UseAuthProps { // UseAuthProps specifies the structure for the useAuth parameters.
    middleware?: 'guest' | 'auth';
    redirectIfAuthenticated?: string;
    role?: 'admin' | 'user'; // Optional role for access control
    status?: 'inactive' | 'active'; // Optional status for account status
}

export const useAuth = ({
    middleware,
    redirectIfAuthenticated,
    role,
    status,
}: UseAuthProps = {}) => {
    const router = useRouter();

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )
    const csrf = () => axios.get('/sanctum/csrf-cookie')
    type RegisterAuthProps = {
        name?: string; // Example of a specific property; add other known properties here
        email?: string;
        password?: string;
        password_confirmation: string; // Add this line
        setErrors: (errors: Record<string, string[]>) => void;
    };
    type LoginAuthProps = {
        email?: string;
        password?: string;
        remember?: boolean;
        setErrors: (errors: Record<string, string[]>) => void;
        setStatus: (status: string | undefined) => void;

    };
    type EmailVerificationProps = {
        setStatus: (status: string | undefined) => void;
    };
    const register = async ({ setErrors, ...props }: RegisterAuthProps) => {
        await csrf();
        setErrors({});

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422 ) throw error

                setErrors(error.response.data.errors)
            })
    }
    const resendEmailVerification = ({ setStatus }: EmailVerificationProps) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const login = async ({ setErrors, setStatus, ...props }: LoginAuthProps) => {

        await csrf()
        setErrors({})
        setStatus(undefined)

        // example {} of setErrors({})   => Clears any old error messages from the state.
        /* 
            {
                email: ["Email is required"],
                password: ["Password is required"]
            }
        */
        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const logout = useCallback(async () => {
        if (!error) {
            await axios.post('/logout');
            mutate();
        }
        window.location.pathname = '/login';
    }, [error, mutate]);

    useEffect(() => {
        // Ensure that user and error are loaded before running any logic
        if (!user && !error) return;

        const currentPath = window.location.pathname;

        // 1. Handle logout for "auth" middleware if there is an error
        if (middleware === 'auth' && error) {
            logout();
            return;
        }

        // 2. Redirect inactive users to the /inactiveaccount page
        if (middleware === 'auth' && user?.status === 'inactive') {
            if (currentPath !== '/inactiveaccount') {
                console.log('Redirecting to /inactiveaccount');
                router.push('/inactiveaccount');
            }
            return;
        }

        // 3. Redirect unverified users to /verify-email
        if (middleware === 'auth' && user && !user.email_verified_at) {
            if (window.location.pathname !== '/verify-email') {
                router.push('/verify-email');
            }
            return;
        }

        // 4. Redirect to role-based dashboards for logged-in users
        if (middleware === 'auth' && user) {
        
            if (user.role === 'admin' && !currentPath.startsWith('/dashboard_admin')) {
                console.log('Redirecting to /dashboard_admin');
                router.push('/dashboard_admin');
                return;
            }
        
            if (user.role === 'user' && !currentPath.startsWith('/dashboard_user')) {
                console.log('Redirecting to /dashboard_user');
                router.push('/dashboard_user');
                return;
            }

            return; // Prevent further checks after role redirect
        }

        // 5. Redirect authenticated guest users to the specified page
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            if (currentPath !== redirectIfAuthenticated) {
                console.log('Redirecting guest user to:', redirectIfAuthenticated);
                router.push(redirectIfAuthenticated);
            }
            return;
        }

        // 6. Redirect verified users away from /verify-email
        if (currentPath === '/verify-email' && user?.email_verified_at) {
            router.push(redirectIfAuthenticated || '/');
            return;
        }
        
    }, [user, error, middleware, redirectIfAuthenticated, router, logout, role, status]);

    const hasRole = (requiredRole: 'admin' | 'user'): boolean => {
        return user?.role?.toLowerCase() === requiredRole.toLowerCase();
    };

    return {
        user,
        register,
        login,
        logout,
        resendEmailVerification,
        hasRole,
    }
}