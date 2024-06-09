import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');  

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      setError('Email atau password salah');
      return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));

    navigate('/monitoring');
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2 className="welcome-text">Selamat datang di</h2>
        <img src="/logospasi.png" alt="Logo SPASI" className="logo" />
        <p className="login-prompt">Silakan login</p>
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Ketik alamat e-mail" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Ketik password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>
          Belum punya akun? <a href="/register">Daftar di sini</a>
        </p>
      </div>
      <div className="login-right">
        <div className="overlay"></div>
        <img src="/parkiran.png" alt="Parkiran" className="background-image" />
      </div>
    </div>
  );
}

export default LoginPage;
