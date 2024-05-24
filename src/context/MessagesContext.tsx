import React, { createContext, useContext, useState } from "react";

interface Message {
  id: number;
  username: string;
  text: string;
  role: string;
  avatar: string;
  audioUrl?: string;
  loading?: boolean;
}

interface Chat {
  id: string;
  name: string;
  messages: Message[];
}

interface MessagesContextType {
  chats: Chat[];
  addChat: (chat: Chat) => void;
  addMessageToChat: (chatId: string, message: Message) => void;
  updateMessage: (chatId: string, messageId: number, updates: Partial<Message>) => void;
  addAudioToChat: (chatId: string, audioUrl: string) => void;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  const addChat = (chat: Chat) => {
    setChats((prevChats) => [...prevChats, chat]);
  };

  const updateChat = (chatId: string, updates: Partial<Chat>) => {
    setChats((prevChats) =>
      prevChats.map((chat) => (chat.id === chatId ? { ...chat, ...updates } : chat))
    );
  };

  const addMessageToChat = (chatId: string, message: Message) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId ? { ...chat, messages: [...chat.messages, message] } : chat
      )
    );
  };

  const updateMessage = (chatId: string, messageId: number, updates: Partial<Message>) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === messageId ? { ...msg, ...updates } : msg
              ),
            }
          : chat
      )
    );
  };

  const addAudioToChat = (chatId: string, audioUrl: string) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.role === "bot" && !msg.audioUrl ? { ...msg, audioUrl } : msg
              ),
            }
          : chat
      )
    );
  };

  return (
    <MessagesContext.Provider
      value={{ chats, addChat, addMessageToChat, updateMessage, addAudioToChat }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = (): MessagesContextType => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
};
