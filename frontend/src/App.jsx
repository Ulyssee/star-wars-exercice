import React from 'react';
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
  return (
    <div className="app-container">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/detail/:category/:id" element={<PrivateRoute><Detail /></PrivateRoute>} />
          </Routes>
        </Router>
      </AuthProvider>

    </div>
  );
};

export default App;
