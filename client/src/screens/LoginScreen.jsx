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
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-md text-center"
            >
                <h1 className="text-4xl font-game font-bold mb-8 text-primary drop-shadow-md">
                    QUIZ BATTLE
                </h1>

                {/* Connection Status Indicator */}
                {!socket || !socket.connected ? (
                    <div className="mb-4 text-red-500 font-bold bg-red-100 p-2 rounded-lg text-sm">
                        ⚠️ 서버 연결 중... 잠시만 기다려주세요.
                    </div>
                ) : null}

                <div className="mb-6">
                    <label className="block text-left font-bold text-gray-700 mb-2 ml-2">닉네임</label>
                    <input
                        type="text"
                        className="w-full px-6 py-4 text-xl rounded-2xl border-4 border-gray-200 focus:border-primary focus:outline-none transition-colors font-bold text-center"
                        placeholder="이름을 입력하세요"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                    />
                </div>

                <Button
                    onClick={handleJoin}
                    className="w-full text-2xl py-4"
                    disabled={!socket || !socket.connected} // Disable if not connected
                >
                    게임 입장! 🚀
                </Button>

            </motion.div>
        </div>
    );
}
