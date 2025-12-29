import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { QRCodeSVG } from 'qrcode.react';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function LobbyScreen() {
    const { socket, isConnected } = useSocket();
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();
    const joinUrl = window.location.origin;

    useEffect(() => {
        if (!socket) return;

        // Join as host to receive updates
        socket.emit('join_host');

        socket.on('lobby_update', (updatedPlayers) => {
            setPlayers(updatedPlayers);
        });

        socket.on('game_started', () => {
            navigate('/host');
        });

        return () => {
            socket.off('lobby_update');
            socket.off('game_started');
        };
    }, [socket, navigate]);

    const handleStart = () => {
        socket.emit('start_game');
    };

    return (
        <div className="min-h-screen flex flex-col p-8">
            {/* Header */}
            <header className="flex justify-between items-center mb-12">
                <h1 className="text-6xl font-game font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-shadow-neon">
                    참가자 대기실
                </h1>
                <div className="text-2xl font-bold bg-black/50 backdrop-blur-md border border-cyan-500/50 px-8 py-4 rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.3)] text-cyan-300">
                    접속 인원: <span className="text-white text-3xl ml-2">{players.length}</span>명
                </div>
            </header>

            <div className="flex-1 flex gap-12">
                {/* Left: QR Code */}
                <div className="flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl max-w-sm relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 pointer-events-none" />

                    <div className="bg-white p-4 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                        <QRCodeSVG value={joinUrl} size={250} level="H" />
                    </div>
                    <p className="mt-8 text-xl font-bold text-cyan-300 break-all text-center font-mono">
                        {joinUrl}
                    </p>
                    <div className="mt-8 w-full">
                        <Button onClick={handleStart} variant="primary" className="w-full text-2xl py-4 bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 border-none shadow-[0_0_20px_rgba(72,187,120,0.5)] transform hover:scale-105 transition-all">
                            게임 시작! ▶
                        </Button>
                    </div>
                </div>

                {/* Right: Player Grid */}
                <div className="flex-1 bg-black/30 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-inner overflow-hidden relative">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
                    <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 place-items-center">
                        <AnimatePresence>
                            {players.map((p) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ scale: 0, rotateY: -180 }}
                                    animate={{ scale: 1, rotateY: 0 }}
                                    exit={{ scale: 0 }}
                                    className="flex flex-col items-center group"
                                >
                                    <Avatar src={p.avatar} state="idle" className="mb-3" />
                                    <span className="font-bold bg-black/60 border border-cyan-500/30 text-cyan-200 px-4 py-1 rounded-full text-sm shadow-[0_0_10px_rgba(0,255,255,0.2)]">
                                        {p.nickname}
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
