import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const { loginWithGoogle, loginWithEmail, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginWithEmail(email, password);
    if (isAuthenticated) {
      navigate('/');
    }
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
    if (isAuthenticated) {
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleEmailLogin} className="p-4 bg-white rounded shadow-md">
        <h2 className="mb-4 text-lg">Login</h2>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="w-full p-2 mb-4 text-white bg-blue-500 rounded">
          Login
        </button>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full p-2 text-white bg-red-500 rounded"
        >
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
