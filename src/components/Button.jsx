import React from 'react';
import { motion } from 'framer-motion';

export default function Button({ children, onClick, className = '', variant = 'primary' }) {
    const baseStyle = "px-6 py-3 rounded-2xl font-game text-xl font-bold shadow-game transition-all active:translate-y-1 active:shadow-none";

    const variants = {
        primary: "bg-primary text-white border-b-4 border-blue-700 hover:bg-blue-400",
        secondary: "bg-secondary text-black border-b-4 border-yellow-600 hover:bg-yellow-300",
        accent: "bg-accent text-white border-b-4 border-red-700 hover:bg-red-400",
        success: "bg-success text-white border-b-4 border-emerald-700 hover:bg-emerald-400"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${baseStyle} ${variants[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
}
