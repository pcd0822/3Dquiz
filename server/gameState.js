export const GameState = {
    players: {}, // { socketId: { id, nickname, avatar, score, rank, connected } }
    rooms: {
        'default': {
            status: 'WAITING', // WAITING, PLAYING, FINISHED
            currentQuestionIndex: 0,
            quizzes: [],
            answers: {} // { questionId: { socketId: answer } }
        }
    }
};

export function addPlayer(socketId, nickname, avatar) {
    GameState.players[socketId] = {
        id: socketId,
        nickname: nickname || `Player ${socketId.substr(0, 4)}`,
        avatar: avatar,
        score: 0,
        rank: 0,
        streak: 0,
        connected: true
    };
    return GameState.players[socketId];
}

export function removePlayer(socketId) {
    if (GameState.players[socketId]) {
        GameState.players[socketId].connected = false;
        // Optionally delete
        // delete GameState.players[socketId];
    }
}

export function updateScore(socketId, points) {
    const player = GameState.players[socketId];
    if (player) {
        player.score += points;
        if (points > 0) player.streak++;
        else player.streak = 0;
    }
    return player;
}

export function getLeaderboard() {
    return Object.values(GameState.players)
        .filter(p => p.connected)
        .sort((a, b) => b.score - a.score)
        .map((p, index) => ({ ...p, rank: index + 1 }));
}
