import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.scss';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        //Si vous voulez test pour le server Node, modifier le port en 3001
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        login(username, password);
        navigate('/');
      } else {
        setError('Identifiants invalides');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la connexion');
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Connexion à la Résistance</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-input"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="login-error">{error}</p>}
        <button type="submit" className="login-button">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
