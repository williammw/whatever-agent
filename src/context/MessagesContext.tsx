// src/context/MessagesContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface Message {
  id: number;
  username: string;
  text: string;
  role: string;
  avatar: string;
  audioUrl?: string;
  loading?: boolean;
}

interface MessagesContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
  updateMessage: (id: number, updatedMessage: Partial<Message>) => void;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const MessagesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      username: "iBuu",
      text: "Hello! How can I assist you today?",
      role: "bot",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
  ]);

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      message,
    ]);
  };

  const updateMessage = (id: number, updatedMessage: Partial<Message>) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, ...updatedMessage } : message
      )
    );
  };

  return (
    <MessagesContext.Provider value={{ messages, addMessage, updateMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
};
