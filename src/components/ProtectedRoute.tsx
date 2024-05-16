import React, { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMessages } from "../context/MessagesContext";
import { v4 as uuidv4 } from 'uuid';

const ProtectedRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  const { isAuthenticated, isNewUser, user } = useAuth();
  const { chats, addChat } = useMessages();
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const initialized = useRef(false);  // <-- Add useRef to keep track of initialization

  useEffect(() => {
    console.log("ProtectedRoute useEffect:", { isAuthenticated, isNewUser, chats, user });
    if (isAuthenticated !== undefined && isNewUser !== undefined && chats !== undefined) {
      setIsInitialized(true);
      if (isAuthenticated && !isNewUser && chats.length === 0 && !initialized.current) {
        initialized.current = true;  // <-- Set initialized to true
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
  }, [isAuthenticated, isNewUser, chats, addChat, navigate]);

  if (!isInitialized) {
    return null; // or a loading spinner if you have one
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isNewUser) {
    return <Navigate to="/profile" />;
  }

  return <Component />;
};

export default ProtectedRoute;
