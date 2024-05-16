import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { applyActionCode } from "firebase/auth";

const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get("oobCode");

    if (oobCode) {
      applyActionCode(auth, oobCode)
        .then(() => {
          alert("Your email has been verified. You can now sign in with your new account.");
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error verifying email", error);
          alert(`Error verifying email: ${error.message}`);
          navigate("/login");
        });
    } else {
      alert("Invalid verification link.");
      navigate("/login");
    }
  }, [auth, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl">Verifying your email...</h2>
    </div>
  );
};

export default VerifyEmailPage;
