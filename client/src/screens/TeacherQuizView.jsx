import React from 'react';
import Button from '../components/Button';
import Leaderboard from './Leaderboard';

export default function TeacherQuizView({ quiz, onNext, players, isFinished }) {
    if (isFinished) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center p-8 bg-gray-900">
                <h1 className="text-8xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 font-game mb-12 text-shadow-neon animate-pulse">
                    GAME OVER
                </h1>
                <div className="w-full h-3/4 max-w-6xl bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-[0_0_50px_rgba(255,215,0,0.2)]">
                    <Leaderboard players={players} />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen flex flex-col relative overflow-hidden bg-gray-900 text-white">
            {/* Top Bar: Question */}
            <div className="bg-black/60 backdrop-blur-md p-8 border-b border-cyan-500/30 z-20 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <h2 className="text-5xl text-white font-bold text-center text-shadow-neon leading-tight">
                    <span className="text-cyan-400 mr-4">Q.</span>{quiz.question}
                </h2>
            </div>

            {/* Main Content: Leaderboard Live View */}
            <div className="flex-1 relative z-10 w-full flex items-end justify-center pb-24 px-4">
                <Leaderboard players={players} />
            </div>

            {/* Bottom Control Bar */}
            <div className="absolute bottom-0 w-full p-6 bg-black/80 backdrop-blur-xl border-t border-white/10 flex justify-between items-center z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                <div className="text-white text-3xl font-bold bg-gray-800/50 px-6 py-3 rounded-xl border border-white/10">
                    ANSWER: <span className="text-yellow-400 text-4xl ml-3 text-shadow-neon">{quiz.answer}</span>
                </div>
                <Button onClick={onNext} className="text-2xl px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 shadow-[0_0_20px_rgba(0,255,0,0.3)] border-none hover:scale-105 active:scale-95 transition-all">
                    NEXT QUESTION ▶
                </Button>
            </div>
        </div>
    );
}
