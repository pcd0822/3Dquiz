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
        <div className="min-h-screen bg-blue-50 flex flex-col p-8">
            {/* Header */}
            <header className="flex justify-between items-center mb-12">
                <h1 className="text-5xl font-game text-primary drop-shadow-lg">
                    참가자 대기실
                </h1>
                <div className="text-2xl font-bold bg-white px-6 py-3 rounded-xl shadow-md">
                    접속 인원: <span className="text-accent">{players.length}</span>명
                </div>
            </header>

            <div className="flex-1 flex gap-12">
                {/* Left: QR Code */}
                <div className="flex flex-col items-center justify-center bg-white p-8 rounded-3xl shadow-xl max-w-sm">
                    <QRCodeSVG value={joinUrl} size={250} level="H" />
                    <p className="mt-6 text-2xl font-bold text-gray-800 break-all text-center">
                        {joinUrl}
                    </p>
                    <div className="mt-8 w-full">
                        <Button onClick={handleStart} variant="success" className="w-full text-2xl py-4">
                            게임 시작! ▶
                        </Button>
                    </div>
                </div>

                {/* Right: Player Grid */}
                <div className="flex-1 bg-white/50 rounded-3xl p-8 shadow-inner overflow-hidden">
                    <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 place-items-center">
                        <AnimatePresence>
                            {players.map((p) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    exit={{ scale: 0 }}
                                    className="flex flex-col items-center"
                                >
                                    <Avatar src={p.avatar} state="idle" className="mb-2" />
                                    <span className="font-bold bg-white px-3 py-1 rounded-full shadow-sm text-sm">
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
