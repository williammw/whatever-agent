// src/App.tsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from "react-router-dom";
import { SidebarProvider } from './context/SidebarContext';
import { MessagesProvider } from "./context/MessagesContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import PromptInput from "./components/PromptInput";

// Lazy load components
const LoginPage = lazy(() => import("./components/LoginPage"));
const ApiLoginPage = lazy(() => import("./components/ApiLoginPage"));
const RegisterPage = lazy(() => import("./components/RegisterPage"));
const ProfileForm = lazy(() => import("./components/ProfileForm"));
const Profile = lazy(() => import("./components/Profile"));
const VerifyEmailPage = lazy(() => import("./components/VerifyEmailPage"));
const Content = lazy(() => import("./components/Content"));
const Sidebar = lazy(() => import("./components/Sidebar"));

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MessagesProvider>
          <SidebarProvider>
            <Router>
              <div className="flex h-screen bg-white">
                <AppLayout />
              </div>
            </Router>
          </SidebarProvider>
        </MessagesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

const AppLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const hideNavbarRoutes = ["/login", "/register", "/verify-email"];

  return (
    <>
      {isAuthenticated && (
        <Suspense fallback={<LoadingSpinner />}>
          <Sidebar />
        </Suspense>
      )}
      <div className="flex flex-1 flex-col overflow-hidden">
        {!hideNavbarRoutes.includes(location.pathname) && (
          <Suspense fallback={<LoadingSpinner />}>
            <Navbar />
          </Suspense>
        )}
        <div className="flex-grow overflow-hidden">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/login_v2" element={<ApiLoginPage />} />
                <Route path="/profile_v2" element={<Profile/>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
                <Route path="/" element={<ProtectedRoute component={ContentWithPromptInput} />} />
                <Route path="/u/:chatId" element={<ProtectedRoute component={ContentWithPromptInput} />} />
                <Route path="/profile" element={<ProtectedRoute component={ProfileForm} />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

const ContentWithPromptInput: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
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