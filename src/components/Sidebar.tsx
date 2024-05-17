import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSidebar } from "../context/SidebarContext";
import { Image, Button, Input } from "@nextui-org/react";
import { useMessages } from "../context/MessagesContext";
import { DateRangePicker } from "@nextui-org/date-picker";
import logo from "../assets/logo.png";
import { useAuth } from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';

const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { chats, addChat, updateChat, deleteChat } = useMessages();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");

  const handleCreateChat = () => {
    const newChatId = uuidv4();
    const newChat = {
      id: newChatId,
      name: `Chat ${new Date().toLocaleString()}`,
      messages: [],
    };
    addChat(newChat);
    navigate(`/u/${newChat.id}`);
  };

  const handleEditClick = (chatId: string, currentTitle: string) => {
    setEditingChatId(chatId);
    setNewTitle(currentTitle);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleTitleBlur = (chatId: string) => {
    updateChat(chatId, newTitle);
    setEditingChatId(null);
  };

  const handleTitleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, chatId: string) => {
    if (e.key === "Enter") {
      updateChat(chatId, newTitle);
      setEditingChatId(null);
    }
  };

  const handleDeleteChat = (chatId: string) => {
    deleteChat(chatId);
  };

  return (
    <div
      className={`h-full min-h-screen transition-all duration-300 bg-gray-800 text-white flex flex-col ${isSidebarOpen ? 'sidebar-visible' : 'sidebar-hidden'}`}
    >
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Umami Logo"
            width={32}
            height={32}
            className="mr-2"
          />
          <span className="text-xl font-semibold ml-2">Umami</span>
        </div>
        <div className="flex items-center ml-auto">
          <FontAwesomeIcon
            icon={faPlus}
            className="cursor-pointer text-xl"
            onClick={handleCreateChat}
            title="Create"
          />
          <FontAwesomeIcon
            icon={faTimes}
            onClick={toggleSidebar}
            className="cursor-pointer ml-4 text-xl"
            title="Close"
          />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto p-4">
        <div className="mb-4">
          <DateRangePicker label="Stay duration" className="max-w-xs w-full" />
        </div>
        {user && (
          <div className="user-info mb-4 p-4 bg-gray-200 rounded-lg">
            <img src={user.photoURL ?? ''} alt={`${user.displayName}'s avatar`} className="w-10 h-10 rounded-full mb-2" />
            <h4 className="text-lg font-semibold">{user.displayName}</h4>
            <p className="text-sm">{user.email}</p>
            <button
              onClick={logout}
              className="mt-2 p-2 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </div>
        )}
        <div>
          <h2 className="text-lg font-semibold mb-4">Chat</h2>
          {chats.map((chat) => (
            <div key={chat.id} className="flex items-center justify-between mb-2">
              {editingChatId === chat.id ? (
                <Input
                  value={newTitle}
                  onChange={handleTitleChange}
                  onBlur={() => handleTitleBlur(chat.id)}
                  onKeyPress={(e) => handleTitleKeyPress(e, chat.id)}
                  autoFocus
                />
              ) : (
                <Link
                  to={`/u/${chat.id}`}
                  className="block p-2 hover:bg-gray-700 rounded-md flex-grow"
                >
                  {chat.name}
                </Link>
              )}
              {editingChatId === chat.id ? (
                <FontAwesomeIcon
                  icon={faCheck}
                  className="cursor-pointer ml-2 text-lg"
                  onClick={() => handleTitleBlur(chat.id)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEdit}
                  className="cursor-pointer ml-2 text-lg"
                  onClick={() => handleEditClick(chat.id, chat.name)}
                />
              )}
              <FontAwesomeIcon
                icon={faTimes}
                className="cursor-pointer ml-2 text-lg"
                onClick={() => handleDeleteChat(chat.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
