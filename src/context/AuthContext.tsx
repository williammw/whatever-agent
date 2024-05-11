import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import apiClient from "../services/apiService";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwtDecode<any>(token);
      setUser(decodedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const response = await apiClient.post("/api/v1/auth/login", { username, password });
    const { access_token } = response.data;
    localStorage.setItem("token", access_token);
    const decodedUser = jwtDecode<any>(access_token);
    setUser(decodedUser);
    setIsAuthenticated(true);
  };

  const register = async (username: string, email: string, password: string) => {
    await apiClient.post("/api/v1/auth/register", { username, email, password });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
