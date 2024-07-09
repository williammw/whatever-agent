import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { sendEmailVerification } from "firebase/auth";
import { Input, Button, Checkbox, Spacer, Select, SelectItem } from "@nextui-org/react";
const apiBaseUrl = import.meta.env.VITE_APP_APIURL;
const RegisterPage: React.FC = () => {
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [days, setDays] = useState<Array<{ label: string, value: string }>>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { loginWithGoogle, loginWithEmail, isAuthenticated, registerWithEmail, logout } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validPassword = validatePassword(password);
    if (!validPassword) {
      setPasswordError("Password must be at least 12 characters long and include uppercase letters, lowercase letters, numbers, and symbols.");
      return;
    }
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

  const validatePassword = (password: string) => {
    const minLength = 12;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasUppercase && hasLowercase && hasNumber && hasSymbol;
  };

  const months = [
    { label: "January", value: "1" },
    { label: "February", value: "2" },
    { label: "March", value: "3" },
    { label: "April", value: "4" },
    { label: "May", value: "5" },
    { label: "June", value: "6" },
    { label: "July", value: "7" },
    { label: "August", value: "8" },
    { label: "September", value: "9" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" }
  ];

  const getDaysInMonth = (month: string, year: string) => {
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    if (isNaN(monthNum) || isNaN(yearNum)) return 31; // Default to 31 days if month or year is invalid
    switch (monthNum) {
      case 2:
        return yearNum % 4 === 0 && (yearNum % 100 !== 0 || yearNum % 400 === 0) ? 29 : 28;
      case 4:
      case 6:
      case 9:
      case 11:
        return 30;
      default:
        return 31;
    }
  };

  useEffect(() => {
    const daysInMonth = getDaysInMonth(birthMonth, birthYear);
    const newDays = Array.from({ length: daysInMonth }, (_, i) => ({
      label: (i + 1).toString(),
      value: (i + 1).toString()
    }));
    setDays(newDays);
    if (birthDay && parseInt(birthDay) > daysInMonth) {
      setBirthDay('');
    }
  }, [birthMonth, birthYear]);

  const years = Array.from({ length: 100 }, (_, i) => ({ label: (2024 - i).toString(), value: (2024 - i).toString() }));

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/profile');
    } catch (error) {
      setError('Google sign-in failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700">When's your birthday?</label>
            <div className="flex space-x-2">
              <Select
                items={months}
                label="Month"
                selectedKeys={birthMonth}
                onSelectionChange={(key) => setBirthMonth(key as string)}
                className="w-1/3"
              >
                {(month) => <SelectItem key={month.value}>{month.label}</SelectItem>}
              </Select>
              <Select
                items={days}
                label="Day"
                selectedKeys={birthDay}
                onSelectionChange={(key) => setBirthDay(key as string)}
                className="w-1/3"
              >
                {(day) => <SelectItem key={day.value}>{day.label}</SelectItem>}
              </Select>
              <Select
                items={years}
                label="Year"
                selectedKeys={birthYear}
                onSelectionChange={(key) => setBirthYear(key as string)}
                className="w-1/3"
              >
                {(year) => <SelectItem key={year.value}>{year.label}</SelectItem>}
              </Select>
            </div>
          </div>
          <div className="mb-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
          </div>
          <div className="mb-4 relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError && validatePassword(e.target.value)) {
                  setPasswordError(null);
                }
              }}
              fullWidth
              required
              endContent={
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              }
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          <div className="mb-4">
            <Input
              label="Enter 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              fullWidth
              required
              endContent={
                <Button className="mt-2" onClick={() => { /* Handle send code logic */ }}>
                  Send code
                </Button>
              }
            />
          </div>
          <Checkbox required className="mb-4">
            Get trending content, newsletters, promotions, recommendations, and account updates sent to your email
          </Checkbox>
          <Button type="submit" className="w-full" color="primary">
            Next
          </Button>
        </form>
        <Spacer y={1} />
        <p className="text-center text-gray-700">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
        <Button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white mt-4"
        >
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default RegisterPage;