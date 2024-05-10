import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

interface Message {
  id: number;
  username: string;
  text: string;
  role: string;
  avatar: string;
  audioUrl?: string;
  loading?: boolean;
  userId?: number;
  imageUrl?: string;
  downloadUrl?: string;
}

interface Chat {
  id: string; // Change id type to string
  name: string;
  messages: Message[];
}

interface MessagesContextType {
  chats: Chat[];
  addChat: (chat: Chat) => void;
  addMessageToChat: (chatId: string, message: Message) => void;
  updateMessage: (chatId: string, messageId: number, updatedMessage: Partial<Message>) => void;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const MessagesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  const addChat = (chat: Chat) => {
    setChats((prevChats) => [...prevChats, chat]);
  };

  const addMessageToChat = (chatId: string, message: Message) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, messages: [...chat.messages, message] } : chat
      )
    );
  };

  const updateMessage = (chatId: string, messageId: number, updatedMessage: Partial<Message>) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((message) =>
                message.id === messageId ? { ...message, ...updatedMessage } : message
              ),
            }
          : chat
      )
    );
  };

  return (
    <MessagesContext.Provider value={{ chats, addChat, addMessageToChat, updateMessage }}>
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
