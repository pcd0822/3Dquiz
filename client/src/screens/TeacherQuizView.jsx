import React from 'react';
import Button from '../components/Button';
import Leaderboard from './Leaderboard';

export default function TeacherQuizView({ quiz, onNext, players, isFinished }) {
    if (isFinished) {
        return (
            <div className="w-full h-screen bg-gray-900 flex flex-col items-center justify-center">
                <h1 className="text-6xl text-white font-game mb-8">🎉 게임 종료! 🎉</h1>
                <div className="w-full h-3/4">
                    <Leaderboard players={players} />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen flex flex-col relative bg-gray-900 overflow-hidden">
            {/* Top Bar: Question */}
            <div className="bg-white/10 backdrop-blur-md p-6 border-b border-white/20 z-20">
                <h2 className="text-4xl text-white font-bold text-center shadow-black drop-shadow-md">
                    Q. {quiz.question}
                </h2>
            </div>

            {/* Main Content: Leaderboard Live View */}
            <div className="flex-1 relative z-10 w-full flex items-end justify-center pb-20">
                <Leaderboard players={players} />
            </div>

            {/* Bottom Control Bar */}
            <div className="absolute bottom-0 w-full p-6 bg-gray-800 flex justify-between items-center z-30 shadow-2xl-up">
                <div className="text-white text-xl font-bold">
                    정답: <span className="text-yellow-400 text-2xl ml-2">{quiz.answer}</span>
                </div>
                <Button onClick={onNext} variant="success" className="text-xl">
                    다음 문제 ▶
                </Button>
            </div>
        </div>
    );
}
