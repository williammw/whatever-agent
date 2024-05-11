import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import SidebarToggleIcon from "./components/SidebarToggleIcon";
import { SidebarProvider } from './context/SidebarContext';
import { MessagesProvider } from "./context/MessagesContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";

const App = () => {
  return (
    <AuthProvider>
      <MessagesProvider>
        <SidebarProvider>
          <Router>
            <div className="flex h-screen bg-white">
              <Sidebar />
              <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
                <SidebarToggleIcon />
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/" element={<ProtectedRoute component={Content} />} />
                  <Route path="/u/:chatId" element={<ProtectedRoute component={Content} />} />
                </Routes>
              </div>
            </div>
          </Router>
        </SidebarProvider>
      </MessagesProvider>
    </AuthProvider>
  );
};

const ProtectedRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default App;
