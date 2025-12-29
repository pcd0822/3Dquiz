import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';
import Button from '../components/Button';
import { motion } from 'framer-motion';

export default function LoginScreen() {
    const [nickname, setNickname] = useState('');
    const { joinGame, player, socket } = useSocket();
    const navigate = useNavigate();

    useEffect(() => {
        if (player) {
            navigate('/play');
        }
    }, [player, navigate]);

    const handleJoin = () => {
        if (nickname.trim()) {
            joinGame(nickname);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 text-white">
            <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="bg-black/40 backdrop-blur-xl p-10 rounded-[2rem] shadow-[0_0_50px_rgba(0,255,255,0.2)] w-full max-w-md text-center border border-white/10 relative overflow-hidden"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                <h1 className="text-5xl font-game font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300 text-shadow-neon tracking-wider">
                    QUIZ BATTLE
                </h1>

                {/* Connection Status Indicator */}
                {!socket || !socket.connected ? (
                    <div className="mb-6 text-red-300 font-bold bg-red-900/50 border border-red-500/50 p-3 rounded-xl text-sm animate-pulse">
                        ⚠️ 서버 연결 중... 잠시만 기다려주세요.
                    </div>
                ) : null}

                <div className="mb-8 relative group">
                    <label className="block text-left font-bold text-cyan-300 mb-2 ml-2 tracking-widest text-sm uppercase">Nickname</label>
                    <input
                        type="text"
                        className="w-full px-6 py-4 text-xl rounded-2xl bg-black/50 border-2 border-white/10 focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(0,255,255,0.3)] focus:outline-none transition-all font-bold text-center text-white placeholder-white/20"
                        placeholder="이름을 입력하세요"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                    />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-cyan-500 transition-all duration-300 group-focus-within:w-full" />
                </div>

                <Button
                    onClick={handleJoin}
                    className="w-full text-2xl py-5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-2xl shadow-[0_0_20px_rgba(0,255,255,0.4)] border-none transform hover:scale-[1.02] active:scale-95 transition-all font-bold tracking-widest"
                    disabled={!socket || !socket.connected} // Disable if not connected
                >
                    GAME START 🚀
                </Button>

            </motion.div>
        </div>
    );
}
