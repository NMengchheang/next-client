'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/auth';

export default function Page() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { logout, resendEmailVerification } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/dashboard_admin',
    })

    const [status, setStatus] = useState<string | undefined>(undefined);
    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="mb-4 text-sm text-gray-700">
                    Thanks for signing up! Before getting started, could you verify
                    your email address by clicking on the link we just
                    emailed to you? If you didn&apos;t receive the email, we will gladly
                    send you another.
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        A new verification link has been sent to the email address
                        you provided during registration.
                    </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                    <button 
                        onClick={async () => {
                            if(!isSubmitting) {
                                setIsSubmitting(true); // Set to true before starting the async operation
                                try {
                                    await resendEmailVerification({ setStatus });
                                } catch (error) {
                                    console.error("Failed to resend verification email:", error);
                                    // Handle error appropriately, e.g., show a toast notification
                                } finally {
                                    setIsSubmitting(true);
                                }
                            } 
                        }}
                        type="button"
                        className={`rounded-lg px-5 py-2.5 text-sm font-medium text-white inline-flex items-center
                            ${!isSubmitting ? 'bg-blue-800 hover:bg-blue-500' : ' bg-blue-400'}
                            focus:ring-4 focus:outline-none focus:ring-blue-300 text-center dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                        disabled={isSubmitting}
                    >
                        <svg className="w-3.5 h-3.5 text-white me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                        </svg>
                        {isSubmitting ? 'Resending...' : 'Resend Verification Email'}
                    </button>

                    <button type="button" onClick={logout} className="text-sm px-5 py-2.5 text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30">
                        <svg className="me-2 w-3.5 h-3.5 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"/>
                        </svg>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}
