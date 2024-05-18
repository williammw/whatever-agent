import React, { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMessages } from "../context/MessagesContext";
import { v4 as uuidv4 } from 'uuid';

const ProtectedRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  const { isAuthenticated, user } = useAuth();
  const { chats, addChat } = useMessages();
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    console.log("ProtectedRoute useEffect Start:", { isAuthenticated, chats, user });
    if (isAuthenticated !== undefined && chats !== undefined) {
      setIsInitialized(true);
      if (isAuthenticated && chats.length === 0 && !initialized.current) {
        initialized.current = true;
        const newChatId = uuidv4();
        const newChat = {
          id: newChatId,
          name: `Chat ${new Date().toLocaleString()}`,
          messages: [],
        };
        addChat(newChat);
        navigate(`/u/${newChatId}`);
      }
    }
  }, [isAuthenticated, chats, addChat, navigate]);

  if (!isInitialized) {
    console.log("Not initialized, showing null");
    return null; // or a loading spinner if you have one
  }

  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" />;
  }

  return <Component />;
};

export default ProtectedRoute;
