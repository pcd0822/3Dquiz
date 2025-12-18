import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '../components/Avatar';

export default function Leaderboard({ players }) {
    // players array is expected to be sorted by rank
    // We need to track previous ranks to trigger "Overtake" or "Fail" animations
    const prevRanksRef = useRef({});

    const [displayPlayers, setDisplayPlayers] = useState([]);

    useEffect(() => {
        // Determine state changes for animation
        const newDisplayPlayers = players.map(p => {
            const prevRank = prevRanksRef.current[p.id];
            let state = 'running'; // default for 2nd+

            if (p.rank === 1) state = 'dancing';

            // Logic for Overtake / Frustrated (Optional enhancement)
            // If rank improved (smaller number) -> Overtake
            // If rank dropped -> Frustrated
            // For simplicity in this demo, we stick to dancing/running loop, 
            // but adding a temporary state for transition would be cool.

            return { ...p, state };
        });

        setDisplayPlayers(newDisplayPlayers);

        // Update refs
        players.forEach(p => {
            prevRanksRef.current[p.id] = p.rank;
        });

    }, [players]);

    // Max score for bar height calculation
    const maxScore = Math.max(...players.map(p => p.score), 100);

    return (
        <div className="w-full h-full flex items-end justify-center gap-4 px-4 pb-12 relative overflow-hidden">
            {/* Floor */}
            <div className="absolute bottom-0 w-full h-4 bg-gray-800 z-0" />

            <AnimatePresence>
                {displayPlayers.slice(0, 10).map((player) => { // Top 10 only for visual sanity
                    const heightPercent = (player.score / maxScore) * 80; // Max 80% height
                    const isFirst = player.rank === 1;

                    return (
                        <motion.div
                            key={player.id}
                            layoutId={player.id}
                            initial={{ opacity: 0, y: 100 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex flex-col items-center justify-end z-10 w-24"
                            style={{ height: '100%' }}
                        >
                            {/* Avatar & Rank Badge */}
                            <div className="relative mb-2 flex flex-col items-center">
                                {isFirst && (
                                    <motion.div
                                        className="text-4xl absolute -top-12 z-20"
                                        animate={{ rotate: [-10, 10, -10] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    >
                                        👑
                                    </motion.div>
                                )}

                                <Avatar src={player.avatar} state={player.state} className="w-20 h-20" />

                                <motion.div
                                    className={`mt-1 font-game font-bold text-white px-2 rounded-full text-lg shadow-md ${isFirst ? 'bg-yellow-500' : 'bg-gray-700'}`}
                                >
                                    {player.rank}위
                                </motion.div>
                                <div className="text-white font-bold text-sm bg-black/50 px-2 rounded mt-1">
                                    {player.nickname}
                                </div>
                            </div>

                            {/* Bar */}
                            <motion.div
                                className={`w-16 rounded-t-xl shadow-2xl relative ${isFirst ? 'bg-gradient-to-t from-yellow-600 to-yellow-400' : 'bg-gradient-to-t from-blue-600 to-blue-400'}`}
                                initial={{ height: 0 }}
                                animate={{ height: `${heightPercent}%` }}
                                transition={{ type: "spring", stiffness: 100 }}
                            >
                                {/* Score inside bar */}
                                <div className="absolute top-2 w-full text-center font-bold text-white/90 text-xl">
                                    {player.score}
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
