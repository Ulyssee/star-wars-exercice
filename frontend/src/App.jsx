import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/HomePage/Home';
import Login from './pages/LoginPage/Login';
import Detail from './pages/DetailPage/Detail';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); 
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.error('Erreur lors de la lecture audio :', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };


  return (
    <div className="app-container">
      <AuthProvider>
        <Router>
          <div>
            <audio ref={audioRef} src="../assets/audio/A_New_Hope_And_End_Credits.mp3" loop autoPlay hidden />
            <div className="music-control">
              <button onClick={toggleAudio} className="music-button">
                {isPlaying ? '🔇 Stop' : '🔊 Play'}
              </button>
            </div>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path="/detail/:category/:id" element={<PrivateRoute><Detail /></PrivateRoute>} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>

    </div>
  );
};

export default App;
