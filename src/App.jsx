import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import LoginScreen from './screens/LoginScreen';
import LobbyScreen from './screens/LobbyScreen';
import GameScreen from './screens/GameScreen'; // Placeholder, will implement next
import './index.css';

// Temporary placeholders until implemented
const StudentGame = () => <div className="p-8 text-2xl font-bold">학생 게임 화면 대기중...</div>;
const TeacherGame = () => <div className="p-8 text-2xl font-bold">선생님 게임 화면 대기중...</div>;

function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/lobby" element={<LobbyScreen />} />
          <Route path="/play" element={<GameScreen mode="student" />} />
          <Route path="/host" element={<GameScreen mode="teacher" />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
