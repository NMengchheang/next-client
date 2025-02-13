"use client";
import Link from "next/link";
import { useState, FormEvent, useEffect } from "react";
import { useAuth } from '@/hooks/auth';
import Input from "@/components/Input";
import InputError from "@/components/InputError";
import { Toast } from "flowbite-react";
import { HiX } from "react-icons/hi";

const Register: React.FC = () => {

    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard_admin',
    });

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLaoding, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [showToastFail, setShowToastFail] = useState(false);


    const timeout = 1000;
    useEffect(() => {
        const time = setTimeout(() => {
            setIsLoading(false);
        }, timeout);

        return () => clearTimeout(time)
    }, [timeout])

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validateField = (field: string, value: string): string[] => {
        switch (field) {
            case 'name':
                if (!value.trim()) {
                    return ['Name is required'];
                }
                break;
            case 'email':
                if (!value.trim()) {
                    return ['Email is required'];
                }
                if (!emailRegex.test(value)) return ['Invalid email format'];
                break;
            case 'password':
                if (!value) {
                    return ['Password is required'];
                }
                if (value.length < 8) {
                    return ['Password must be at least 8 characters'];
                }
                break;
            case 'confirm_password':
                if (!value) {
                    return ['Password confirmation is required'];
                }
                if (value !== password) {
                    return ['Password do not match'];
                }
                break;
            default:
                return[];
        }
        return [];
    };

    const handleRegister = async (event: FormEvent) => {
        event.preventDefault();

        const nameErrors = validateField('name', name);
        const emailErrors = validateField('email', email);
        const passwordErrors = validateField('password', password);
        const confirmPasswordErrors = validateField('confirm_password', confirmPassword)
       
        setErrors({ name: nameErrors, email: emailErrors, password: passwordErrors, confirm_password: confirmPasswordErrors});
        
        if (nameErrors.length > 0 || emailErrors.length > 0) return;
        
        // Proceed with server request
        setIsSubmitting(true);
        setTimeout( async () => {
            try {
                await register({
                    name,
                    email,
                    password,
                    password_confirmation: confirmPassword,
                    setErrors,
                });

            } finally {
                setIsSubmitting(false);
                setShowToastFail(true);
            }
        }, 1500);
    }
    return (
        <div className="flex items-center justify-center min-h-screen ">
            {
                isLaoding ? (
                    <div className="loader"></div>
                ) : (
                    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-center">Register</h2>
                        <div className="flex justify-center">
                            {/* Toast */}
                            {showToastFail && (
                                <Toast  color="failure" >
                                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                                        <HiX className="h-5 w-5" />
                                    </div>
                                    <div className="ml-3 text-sm font-normal">Registration fail!</div>
                                    <Toast.Toggle onClick={() => setShowToastFail(false)} />
                                </Toast>
                            )}
                        </div>
                        <form onSubmit={handleRegister} className="space-y-4 " >
                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium"
                                >
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    className="block w-full"
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                                />
                                <InputError messages={errors.name} className="mt-2" />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium"
                                >
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    className="block w-full"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
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
                                    className="block w-full"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                                <InputError messages={errors.password} className="mt-2" />
                            </div>

                            {/* confim psw */}
                            <div>
                                <label
                                    htmlFor="conpsw"
                                    className="block text-sm font-medium"
                                >
                                    Confirm Passwrod
                                </label>
                                <Input
                                    id="conpsw"
                                    type="password"
                                    className="block w-full"
                                    value={confirmPassword}
                                    onChange={event => setConfirmPassword(event.target.value)}
                                />
                                <InputError messages={errors.confirm_password} className="mt-2" />
                            </div>

                            {/* btn */}
                            <div className="flex items-center justify-between mt-4">
                                
                                <Link
                                    href="/login"
                                    className="underline text-sm text-blue-500 hover:text-gray-900">
                                    Already have an account? Login
                                </Link>

                                <button
                                    type="submit"
                                    className={`px-4 py-2 text-sm font-medium text-white rounded-md ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Register'}
                                </button>
                            </div>
                        </form>
                    </div>
                )
            };
        </div>
    )
}
export default Register;