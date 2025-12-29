import React from 'react';
import { motion } from 'framer-motion';

// defined variants for different states
// defined variants for different states
const variants = {
    idle: {
        y: [0, -10, 0],
        rotateY: [0, 180, 360],
        transition: { duration: 4, repeat: Infinity, ease: "linear" }
    },
    running: {
        x: [-5, 5, -5],
        rotate: [0, 5, -5, 0],
        transition: { duration: 0.2, repeat: Infinity }
    },
    dancing: { // 1st Place
        y: [0, -30, 0],
        rotateY: [0, 360],
        scale: [1, 1.2, 1],
        transition: { duration: 0.8, repeat: Infinity }
    },
    frustrated: { // Overtaken
        scale: [1, 0.8, 1],
        shake: [0, 10, -10, 0],
        filter: ["grayscale(0%)", "grayscale(100%)", "grayscale(0%)"],
        transition: { duration: 0.5 }
    },
    overtake: { // Moving Up
        scale: [1, 1.5, 1],
        boxShadow: "0px 0px 30px #fff",
        zIndex: 100,
        transition: { duration: 0.5 }
    }
};

export default function Avatar({ src, state = 'idle', className }) {
    return (
        <div className={`perspective-1000 ${className}`}>
            <motion.div
                variants={variants}
                animate={state}
                className="relative w-24 h-24 transform-style-3d"
            >
                <div className="absolute inset-0 rounded-full border-4 border-cyan-400 box-shadow-neon bg-gray-800 flex items-center justify-center overflow-hidden">
                    <img src={src} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/30 to-transparent pointer-events-none" />
            </motion.div>
        </div>
    );
}
