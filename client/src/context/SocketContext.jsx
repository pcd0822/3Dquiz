import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [player, setPlayer] = useState(null); // { id, nickname, avatar, score }

    useEffect(() => {
        // Connect to backend
        const newSocket = io('https://quiz-battle-server.onrender.com');
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('Connected to server');
            setIsConnected(true);
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from server');
            setIsConnected(false);
        });

        newSocket.on('player_joined', (playerData) => {
            setPlayer(playerData);
        });

        // Cleanup
        return () => newSocket.close();
    }, []);

    const joinGame = (nickname) => {
        if (socket) {
            socket.emit('join_game', { nickname });
        }
    };

    return (
        <SocketContext.Provider value={{ socket, isConnected, player, joinGame }}>
            {children}
        </SocketContext.Provider>
    );
};
