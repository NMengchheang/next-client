import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    isDeleting: boolean;
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    isDeleting,
}: ConfirmationModalProps) {
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    useEffect(() => {
        if (showSuccessAlert) {
            const timer = setTimeout(() => {
                setShowSuccessAlert(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showSuccessAlert]);

    const handleConfirm = () => {
        onConfirm();
        setShowSuccessAlert(true);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                    initial={{ opacity: 0 }} // Initial state (hidden)
                    animate={{ opacity: 1 }} // Animate to visible
                    exit={{ opacity: 0 }} // Animate to hidden when exiting
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} // Initial state (scaled down and hidden)
                            animate={{ scale: 1, opacity: 1 }} // Animate to full size and visible
                            exit={{ scale: 0.9, opacity: 0 }} // Animate to scaled down and hidden when exiting
                            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
                        >
                            <FaExclamationTriangle className="text-yellow-500 text-xl" />
                            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                            <p className="mt-2 text-sm text-gray-600">{message}</p>
                            <div className="mt-4 flex justify-end space-x-3">
                                
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirm}
                                    disabled={isDeleting}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                                >
                                    { isDeleting ? "Deleting..." : "Delete"}
                                </button>

                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success Alert */}
            <AnimatePresence>
                {showSuccessAlert && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-4 right-4 z-50"
                    >
                        <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
                            <FaCheckCircle className="text-lg" />
                            <span>Deletion successful!</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
