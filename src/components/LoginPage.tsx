import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {Input} from "@nextui-org/react";
import { EyeFilledIcon } from './EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';

const LoginPage: React.FC = () => {
  const { loginWithGoogle, loginWithEmail, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginWithEmail(email, password);
  };

  const handleGoogleLogin = async () => {
    await loginWithGoogle();
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-1/2 bg-gray-800 items-center justify-center">
        <div className="text-white p-8">
          <p className="mt-6 text-xl"></p>
        </div>
      </div>
      <div className="flex items-center justify-center w-full md:w-1/2 bg-gray-100">
        <form onSubmit={handleEmailLogin} className="p-8 w-full max-w-md">
          <h2 className="mb-4 text-2xl font-bold">Welcome back!</h2>
          <p className="mb-6 text-gray-600">Please enter your credentials to sign in!</p>
          <div className="mb-4">
            {/* <label className="block mb-2 text-gray-700">User Name</label> */}
            {/* <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            /> */}
            <Input
              label="Email"
              variant="bordered"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-0 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
          </div>
          <div className="mb-4 relative">
            {/* <label className="block mb-2 text-gray-700">Password</label> */}
            
            <Input
              label="Password"
              variant="bordered"
              // placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="w-full p-0 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {/* {showPassword ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )} */}
            </button>
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-gray-700">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button type="submit" className="w-full p-2 mb-4 text-white bg-blue-500 rounded">
            Sign In
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full p-2 mb-4 text-white bg-red-500 rounded"
          >
            Sign in with Google
          </button>
          <p className="mt-4 text-center text-gray-700">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;