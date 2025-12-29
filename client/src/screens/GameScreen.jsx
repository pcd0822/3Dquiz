import React, { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import StudentQuizView from './StudentQuizView';
import TeacherQuizView from './TeacherQuizView';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audioManager';

export default function GameScreen({ mode }) { // mode: 'student' | 'teacher'
    const { socket, player } = useSocket();
    const navigate = useNavigate();

    const [currentQuiz, setCurrentQuiz] = useState(null);
    const [answerResult, setAnswerResult] = useState(null);
    const [players, setPlayers] = useState([]); // Leaderboard data
    const [gameStatus, setGameStatus] = useState('PLAYING');

    useEffect(() => {
        if (!socket) return;

        // Listeners
        socket.on('new_question', (quiz) => {
            setCurrentQuiz(quiz);
            setAnswerResult(null); // Reset for new question
        });

        socket.on('answer_result', (result) => {
            setAnswerResult(result);
            if (result.isCorrect) {
                playSound('correct');
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            } else {
                playSound('wrong');
            }
        });

        socket.on('leaderboard_update', (data) => {
            setPlayers(data);
            // Logic to detect rank change could be here for 'cheer' sound, 
            // but simple implementation: just play cheer on 'game_over' or big events.
        });

        socket.on('game_over', (finalLeaderboard) => {
            playSound('cheer');
            setGameStatus('FINISHED');
            setPlayers(finalLeaderboard);
            if (mode === 'student') {
                // Optional: Redirect student to summary or just show "Finished"
            }
        });

        return () => {
            socket.off('new_question');
            socket.off('answer_result');
            socket.off('leaderboard_update');
            socket.off('game_over');
        };
    }, [socket, mode]);

    const handleStudentSubmit = (answer) => {
        // 30 seconds default or calculate real remaining time if synced
        const timeLeft = 20; // Mock time left
        socket.emit('submit_answer', { answer, timeLeft });
    };

    const handleNoteNext = () => {
        socket.emit('next_question');
    };

    if (!currentQuiz && gameStatus !== 'FINISHED') {
        return <div className="flex h-screen items-center justify-center text-2xl text-white font-bold bg-primary">Loading Game...</div>;
    }

    if (mode === 'teacher') {
        return (
            <TeacherQuizView
                quiz={currentQuiz}
                onNext={handleNoteNext}
                players={players}
                isFinished={gameStatus === 'FINISHED'}
            />
        );
    }

    // Student Mode
    if (gameStatus === 'FINISHED') {
        return (
            <div className="flex flex-col h-screen items-center justify-center bg-gray-900 text-white">
                <h1 className="text-4xl font-bold mb-4">게임 종료!</h1>
                <div className="text-2xl">수고하셨습니다!</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-400 to-indigo-600 flex items-center justify-center p-4">
            <StudentQuizView
                quiz={currentQuiz}
                onSubmit={handleStudentSubmit}
                answerResult={answerResult}
            />
        </div>
    );
}
