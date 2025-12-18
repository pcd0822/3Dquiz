import React from 'react';
import { motion } from 'framer-motion';

// defined variants for different states
const variants = {
    idle: {
        y: [0, -5, 0],
        rotate: 0,
        scale: 1,
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    },
    running: {
        y: [0, -10, 0],
        rotate: [10, 15, 10],
        transition: { duration: 0.5, repeat: Infinity }
    },
    dancing: { // 1st Place
        y: [0, -20, 0],
        rotate: [-10, 10, -10],
        scale: [1, 1.1, 1],
        transition: { duration: 0.5, repeat: Infinity }
    },
    frustrated: { // Overtaken
        scaleY: [1, 0.7, 1],
        filter: ["grayscale(0%)", "grayscale(100%)", "grayscale(0%)"],
        x: [-2, 2, -2, 2, 0],
        transition: { duration: 0.5 }
    },
    overtake: { // Moving Up
        scale: [1, 1.5, 1],
        zIndex: 100,
        transition: { duration: 0.5 }
    }
};

export default function Avatar({ src, state = 'idle', className }) {
    return (
        <motion.div
            variants={variants}
            animate={state}
            className={`relative inline-block ${className}`}
        >
            <img src={src} alt="Avatar" className="w-16 h-16 rounded-full shadow-lg border-2 border-white bg-white object-cover" />
        </motion.div>
    );
}
