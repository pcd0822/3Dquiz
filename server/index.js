import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { loadQuizzes } from './quizLoader.js';
import { GameState, addPlayer, removePlayer, updateScore, getLeaderboard } from './gameState.js';
import { getRandomAvatar } from './avatars.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*", // Allow all for demo
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Load Quizzes on Start
let QUIZZES = [];
loadQuizzes().then(data => {
    QUIZZES = data;
    GameState.rooms['default'].quizzes = QUIZZES;
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join Game
    socket.on('join_game', ({ nickname }) => {
        const avatar = getRandomAvatar();
        const player = addPlayer(socket.id, nickname, avatar);

        socket.join('default');

        // Notify user of their avatar
        socket.emit('player_joined', player);

        // Notify teacher (lobby)
        io.to('default').emit('lobby_update', Object.values(GameState.players));

        console.log(`Player joined: ${nickname} (${avatar})`);
    });

    // Start Game (Teacher only)
    socket.on('start_game', () => {
        GameState.rooms['default'].status = 'PLAYING';
        GameState.rooms['default'].currentQuestionIndex = 0;

        const currentQuiz = GameState.rooms['default'].quizzes[0];

        io.to('default').emit('game_started');
        io.to('default').emit('new_question', currentQuiz);

        console.log('Game Started!');
    });

    // Submit Answer
    socket.on('submit_answer', ({ answer, timeLeft }) => {
        const room = GameState.rooms['default'];
        const currentQuiz = room.quizzes[room.currentQuestionIndex];
        const player = GameState.players[socket.id];

        if (!player || !currentQuiz) return;

        const isCorrect = answer === currentQuiz.answer;

        // Calculate Score: Base 100 + Time Bonus + Streak Bonus
        let points = 0;
        if (isCorrect) {
            points = 100 + (timeLeft * 2) + (player.streak * 10);
        }

        updateScore(socket.id, points);

        // Send feedback to student
        socket.emit('answer_result', { isCorrect, points, currentScore: player.score });

        // Broadcast partial leaderboard update (for live bar charts)
        // Optimization: Maybe toggle this based on need, but for "Real-time", sending often is good.
        io.to('default').emit('leaderboard_update', getLeaderboard());
    });

    // Next Question
    socket.on('next_question', () => {
        const room = GameState.rooms['default'];
        room.currentQuestionIndex++;

        if (room.currentQuestionIndex >= room.quizzes.length) {
            room.status = 'FINISHED';
            io.to('default').emit('game_over', getLeaderboard());
        } else {
            const nextQuiz = room.quizzes[room.currentQuestionIndex];
            io.to('default').emit('new_question', nextQuiz);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        removePlayer(socket.id);
        io.to('default').emit('lobby_update', Object.values(GameState.players));
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
