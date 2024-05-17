import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import { SidebarProvider } from './context/SidebarContext';
import { MessagesProvider } from "./context/MessagesContext";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProfileForm from "./components/ProfileForm";
import VerifyEmailPage from "./components/VerifyEmailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from "./components/Navbar";

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
                <div className="flex flex-1 flex-col overflow-hidden">
                  <Navbar />
                  <div className="flex-grow overflow-y-auto">
                    <Routes>
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/verify-email" element={<VerifyEmailPage />} />
                      <Route path="/" element={<ProtectedRoute component={Content} />} />
                      <Route path="/u/:chatId" element={<ProtectedRoute component={Content} />} />
                      <Route path="/profile" element={<ProtectedRoute component={ProfileForm} />} />
                    </Routes>
                  </div>
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
