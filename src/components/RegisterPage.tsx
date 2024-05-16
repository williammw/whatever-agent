import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { sendEmailVerification } from "firebase/auth";

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { registerWithEmail, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await registerWithEmail(email, password);
      if (userCredential.user) {
        await sendEmailVerification(userCredential.user, {
          url: "http://localhost:5173/login", // Update to your app login URL
          handleCodeInApp: true,
        });
        alert("Verification email sent. Please check your inbox.");
        await logout(); // Ensure the user is logged out after registration
        navigate("/login"); // Redirect to login page after registration
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert(`Registration failed: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl mb-4">Register</h2>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Register</button>
        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
        <button
          type="button"
          onClick={() => window.location.href = "http://localhost:8000/api/v1/auth/login/google"}
          className="w-full p-2 bg-red-500 text-white rounded mt-4"
        >
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
