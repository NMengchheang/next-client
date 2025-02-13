"use client";
import Link from "next/link";
import { useState, FormEvent, useEffect } from "react";
import AuthSessionStatus from "../../AuthSessionStatus";
import { useAuth } from '@/hooks/auth';
import Input from "@/components/Input";
import InputError from "@/components/InputError";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

const Login: React.FC = () => {

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard_admin',
    })
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [status, setStatus] = useState<string | undefined>(undefined);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({
        email: [],
        password: [],
    });

    const duration = 1000; // Define the duration variable
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, duration);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [duration]);

    useEffect(() => {
        document.getElementById('email')?.focus();
    }, []);

    // Regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validateField = (field: string, value: string): string[] => {
        switch (field) {
            case 'email':
                if (!value) return ["Email is required."];
                if (!emailRegex.test(value)) return ["Invalid email format."];
                break;
            case 'password':
                if (!value) return ["Password is required."];
                if (value.length < 6) return ["Password must be at least 6 characters."];
                break;
            default:
                return [];
        }
        return [];
    };

    const submitForm = async (event: FormEvent) => {
        event.preventDefault();

        const emailErrors = validateField('email', email);
        const passwordErrors = validateField('password', password);

        setErrors({ email: emailErrors, password: passwordErrors });

        if (emailErrors.length > 0 || passwordErrors.length > 0) {
            console.log("Client validation failed. No server request made.");
            return;
        }

        // Proceed with server request
        setIsSubmitting(true);
        setErrorMessage(null);

        setTimeout(async () => {
            try {
                await login({
                    email,
                    password,
                    setErrors,
                    setStatus,
                });
                
            } catch (error: any) {
                // Handle error here
                if (error.response) {
                    if (error.response.status === 500) {
                        setErrorMessage("Server error. Try again later.");
                    } else {
                        setErrorMessage(error.response.data?.error || "An error occurred during login.");
                    }
                } else {
                    // If the error has no response, handle network issues
                    setErrorMessage("Server is unreachable. Try again later.");
                }
            } 
            finally {
                setIsSubmitting(false);
            }
        }, 500); // Debounce for 500ms
    };

    return (
        <>
            <AuthSessionStatus className="mb-4" status={status} />
            <div className="flex items-center justify-center min-h-screen ">
                {isLoading ? (
                    <div className="loader"></div>
                ) : (
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center">Login</h2>
                    {errorMessage && (
                        <Alert color="failure" icon={HiInformationCircle}>
                            <span className="font-medium">{errorMessage}</span>
                        </Alert>
                    )}
                
                    
                    <AuthSessionStatus className="mb-4" status={status} />
                    <form onSubmit={submitForm} className="space-y-4 " >
                        {/* email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium"
                            >
                                Email
                            </label>
                            <Input
                                id="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                                className="block w-full"
                            />
                            <InputError messages={errors.email} className="mt-2" />
                        </div>

                        {/* psw */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium"
                            >
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                                className="block w-full"
                            />
                            <InputError messages={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <label
                                htmlFor="remember_me"
                                className="inline-flex items-center">
                                <Input
                                    id="remember_me"
                                    type="checkbox"
                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                <span className="ml-2 text-sm">
                                    Remember me
                                </span>
                            </label>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                            <Link
                                href="/register"
                                className="underline text-sm text-blue-500 hover:text-gray-900">
                                Create an account
                            </Link>
                            <button
                                type="submit"
                                className={`px-4 py-2 text-sm font-medium text-white rounded-md ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
                )}
            </div>
        </>
    )
}
export default Login;