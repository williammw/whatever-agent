// src/pages/LoginPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <button
          onClick={handleGoogleLogin}
          className="w-full p-2 bg-red-500 text-white rounded mt-4"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
