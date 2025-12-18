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
        <div className="w-full max-w-2xl mx-auto p-4 flex flex-col items-center">
            {/* Question Display */}
            <div className="bg-white rounded-3xl p-6 shadow-xl w-full mb-8 text-center border-b-8 border-gray-200">
                <h2 className="text-3xl font-game font-bold text-gray-800 leading-relaxed break-keep">
                    {quiz.question}
                </h2>
            </div>

            {/* Input Area */}
            {isDescriptive ? (
                <div className="w-full flex flex-col gap-4">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="정답을 입력하세요!"
                        className="w-full p-6 text-2xl font-bold text-center border-4 border-gray-300 rounded-2xl focus:border-primary focus:outline-none"
                        disabled={!!answerResult}
                    />
                    {!answerResult && (
                        <Button onClick={() => handleSubmit(inputText)} className="w-full text-2xl py-4" variant="primary">
                            제출하기
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    {quiz.options.map((opt, idx) => (
                        <Button
                            key={idx}
                            onClick={() => { setSelectedOption(opt); handleSubmit(opt); }}
                            disabled={!!answerResult}
                            variant={['primary', 'secondary', 'accent', 'success'][idx % 4]}
                            className={`text-xl py-6 h-full ${selectedOption === opt ? 'ring-4 ring-black scale-95' : ''}`}
                        >
                            {opt}
                        </Button>
                    ))}
                </div>
            )}

            {/* Result Feedback */}
            {answerResult && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-8 flex flex-col items-center"
                >
                    {answerResult.isCorrect ? (
                        <div className="text-9xl filter drop-shadow-xl animate-bounce">⭕</div>
                    ) : (
                        <div className="text-9xl filter drop-shadow-xl animate-pulse">❌</div>
                    )}
                    <div className="mt-4 text-3xl font-bold text-white text-shadow-game">
                        {answerResult.isCorrect ? `+${answerResult.points}점!` : '아쉽네요!'}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
