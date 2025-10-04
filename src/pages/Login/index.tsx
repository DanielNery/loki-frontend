import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/login/access-token`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const { access_token } = response.data;
      localStorage.setItem('access_token', access_token);
      navigate('/');
    } catch (err: any) {
      setError('Email ou senha inválidos.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-slate-100">Login</h2>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded mb-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded mb-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            required
          />
        </div>
        {error && <div className="text-accent-600 dark:text-accent-400 mb-4">{error}</div>}
        <button
          type="submit"
          className="w-full bg-primary-600 text-white p-3 rounded hover:bg-primary-700 transition focus:outline-none focus:ring-2 focus:ring-primary-500/50"
        >
          Entrar
        </button>
      </form>
    </div>
  );
} 