import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { v4 as uuidv4 } from 'uuid';

function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');  

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(u => u.email === email)) {
      setError('Email sudah digunakan');
      return;
    }

    const newUser = {
      id: uuidv4(),
      fullName,
      email,
      password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    navigate('/login');
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2 className="welcome-text">Selamat datang di</h2>
        <img src="/logospasi.png" alt="Logo SPASI" className="logo" />
        <p className="login-prompt">Silakan buat akun baru</p>
        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Ketik nama lengkap" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required 
          />
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
          <button type="submit">Buat Akun</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p>
          Sudah punya akun? <a href="/login">Login di sini</a>
        </p>
      </div>
      <div className="login-right">
        <div className="overlay"></div>
        <img src="/parkiran.png" alt="Parkiran" className="background-image" />
      </div>
    </div>
  );
}

export default RegisterPage;
