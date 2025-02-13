"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

interface AlertProps {
    show: boolean;
    message: string;
    type: "success" | "warning"; // Define types
}

export default function Alert({ show, message, type }: AlertProps) {
    const bgColor = type === "success" ? "bg-green-500" : "bg-yellow-500";
    const Icon = type === "success" ? FaCheckCircle : FaExclamationTriangle;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-4 right-4 z-50"
                >
                    <div className={`${bgColor} text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2`}>
                        <Icon className="text-lg" />
                        <span>{message}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
