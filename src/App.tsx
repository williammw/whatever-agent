import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import SidebarToggleIcon from "./components/SidebarToggleIcon";
import { SidebarProvider } from './context/SidebarContext';
import { MessagesProvider } from "./context/MessagesContext";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProfileForm from "./components/ProfileForm";
import VerifyEmailPage from "./components/VerifyEmailPage";
import DefaultPage from "./components/DefaultPage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProtectedRoute from "./components/ProtectedRoute"; // Make sure to import the ProtectedRoute component

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
                    <Route path="/verify-email" element={<VerifyEmailPage />} />
                    <Route path="/default" element={<ProtectedRoute component={DefaultPage} />} />
                    <Route path="/" element={<ProtectedRoute component={Content} />} />
                    <Route path="/u/:chatId" element={<ProtectedRoute component={Content} />} />
                    <Route path="/profile" element={<ProtectedRoute component={ProfileForm} />} />
                    <Route path="*" element={<Navigate to="/" />} /> {/* Handle unmatched routes */}
                  </Routes>
                </div>
              </div>
            </Router>
          </SidebarProvider>
        </MessagesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
