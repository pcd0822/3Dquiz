import React, { useState } from 'react';
import Button from '../components/Button';
import { motion } from 'framer-motion';

export default function StudentQuizView({ quiz, onSubmit, answerResult }) {
    const [inputText, setInputText] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSubmit = (val) => {
        if (!val) return;
        onSubmit(val);
    };

    const isDescriptive = quiz.type === 'DESCRIPTIVE';

    return (
        <div className="w-full min-h-screen flex flex-col items-center p-4 bg-gray-900 text-white">
            {/* Question Display */}
            <div className="bg-black/40 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_0_30px_rgba(0,255,255,0.2)] w-full mb-10 text-center border border-cyan-500/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                <h2 className="text-4xl font-game font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-cyan-200 leading-relaxed break-keep text-shadow-neon">
                    {quiz.question}
                </h2>
            </div>

            {/* Input Area */}
            {isDescriptive ? (
                <div className="w-full flex flex-col gap-6">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="정답을 입력하세요!"
                        className="w-full p-6 text-3xl font-bold text-center bg-black/50 border-2 border-cyan-500/50 rounded-2xl text-white placeholder-white/30 focus:border-cyan-400 focus:shadow-[0_0_30px_rgba(0,255,255,0.3)] focus:outline-none transition-all"
                        disabled={!!answerResult}
                    />
                    {!answerResult && (
                        <Button onClick={() => handleSubmit(inputText)} className="w-full text-2xl py-6 bg-gradient-to-r from-cyan-600 to-blue-600 border-none shadow-[0_0_20px_rgba(0,255,255,0.4)]" variant="primary">
                            제출하기
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {quiz.options.map((opt, idx) => (
                        <Button
                            key={idx}
                            onClick={() => { setSelectedOption(opt); handleSubmit(opt); }}
                            disabled={!!answerResult}
                            variant="primary"
                            className={`text-2xl py-8 h-full rounded-2xl border border-white/10 shadow-[0_0_15px_rgba(0,255,255,0.1)] transition-all transform hover:scale-105 hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] ${selectedOption === opt ? 'ring-4 ring-cyan-400 scale-95 bg-cyan-900/50' : 'bg-black/40 backdrop-blur-md'}`}
                        >
                            <span className="text-cyan-100 font-bold">{opt}</span>
                        </Button>
                    ))}
                </div>
            )}

            {/* Result Feedback */}
            {answerResult && (
                <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="mt-12 flex flex-col items-center z-50"
                >
                    {answerResult.isCorrect ? (
                        <div className="text-[10rem] filter drop-shadow-[0_0_50px_rgba(0,255,0,0.8)] animate-bounce">⭕</div>
                    ) : (
                        <div className="text-[10rem] filter drop-shadow-[0_0_50px_rgba(255,0,0,0.8)] animate-pulse">❌</div>
                    )}
                    <div className="mt-6 text-5xl font-bold text-white text-shadow-neon bg-black/60 px-8 py-2 rounded-full border border-white/20">
                        {answerResult.isCorrect ? `+${answerResult.points} POINTS` : 'FAIL'}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
