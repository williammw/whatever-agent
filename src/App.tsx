import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import { SidebarProvider } from './context/SidebarContext';
import { MessagesProvider } from "./context/MessagesContext";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProfileForm from "./components/ProfileForm";
import VerifyEmailPage from "./components/VerifyEmailPage";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import PromptInput from "./components/PromptInput";

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
                  <div className="flex-grow overflow-hidden">
                    <Routes>
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/verify-email" element={<VerifyEmailPage />} />
                      <Route path="/" element={<ProtectedRoute component={ContentWithPromptInput} />} />
                      <Route path="/u/:chatId" element={<ProtectedRoute component={ContentWithPromptInput} />} />
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

const ContentWithPromptInput: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  console.log('ContentWithPromptInput chatId:', chatId);
  return (
    <>
      <Content />
      <div className="sticky bottom-0 w-[80%] mx-auto pb-4 z-10">
        <PromptInput chatId={chatId} />
        <div className="relative px-2 py-2 text-center text-xs text-token-text-secondary md:px-[60px] bg-white"></div>
      </div>
    </>
  );
};

export default App;
