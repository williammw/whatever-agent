import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faEdit, faCheck, faBars } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@nextui-org/react";
import { useMessages } from "../context/MessagesContext";
import { useAuth } from '../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { useSidebar } from '../context/SidebarContext';

const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
  const { chats, addChat, updateChat, deleteChat } = useMessages();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarOpen]);

  const handleCreateChat = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

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
    updateChat(chatId, { name: newTitle });
    setEditingChatId(null);
  };

  const handleTitleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, chatId: string) => {
    if (e.key === "Enter") {
      updateChat(chatId, { name: newTitle });
      setEditingChatId(null);
    }
  };

  const handleDeleteChat = (chatId: string) => {
    deleteChat(chatId);
  };

  const handleOverlayClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className={`flex flex-col h-full min-h-screen bg-gray-800 text-white transition-all duration-300 ${isSidebarOpen ? "w-80" : "w-0"}`}>
        <div className="flex justify-between items-center p-6">
          <div className="flex">
            <FontAwesomeIcon
              icon={faBars}
              onClick={toggleSidebar}
              className="cursor-pointer text-xl"
              title="Close"
            />
          </div>
          <div className="flex items-center ml-auto">
            <FontAwesomeIcon
              icon={faPlus}
              className="cursor-pointer text-xl"
              onClick={handleCreateChat}
              title="Create"
            />
          </div>
        </div>

        <div className="flex-grow overflow-y-auto p-4">
          <div>
            <h2 className="text-lg font-semibold mb-4">Chat</h2>
            {chats.map((chat) => (
              <div key={chat.id} className="flex items-center justify-between mb-2">
                {editingChatId === chat.id ? (
                  <Input
                    value={newTitle}
                    onChange={handleTitleChange}
                    onBlur={() => handleTitleBlur(chat.id)}
                    onKeyUp={(e) => handleTitleKeyPress(e, chat.id)}
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

      {/* Overlay */}
      {/* {isSidebarOpen && window.innerWidth <= 768 && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"
          onClick={handleOverlayClick}
        />
      )} */}
    </>
  );
};

export default Sidebar;
