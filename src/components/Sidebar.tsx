import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBars, faEllipsisH, faPencilAlt, faShare, faTrash, faArchive, faFileExport } from "@fortawesome/free-solid-svg-icons";
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
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

  const handleShareChat = (chatId: string) => {
    // Implement share functionality
    console.log(`Sharing chat ${chatId}`);
  };

  const handleArchiveChat = (chatId: string) => {
    // Implement archive functionality
    console.log(`Archiving chat ${chatId}`);
  };

  const handleExportChat = (chatId: string) => {
    // Implement export functionality
    console.log(`Exporting chat ${chatId}`);
  };

  return (
    <div className={`flex flex-col h-full min-h-screen bg-gray-800 text-white transition-all duration-300 ${isSidebarOpen ? "w-80" : "w-0"}`}>
      <div className="flex justify-between items-center p-2">
        <Button 
          color="primary"
          onClick={toggleSidebar}
          variant="light"
          isIconOnly
          className="flex item-center transition-opacity duration-300"
        >
          <FontAwesomeIcon icon={faBars} className="text-gray-600" />
        </Button>
        <Button 
          color="primary" 
          onClick={handleCreateChat} 
          isIconOnly 
          variant="light"
        >
          <FontAwesomeIcon icon={faPlus} className="text-gray-600" />
        </Button>
      </div>

      <div className="flex-grow overflow-y-auto p-4 hide-scrollbar">
        <div>
          <h2 className="text-lg mb-4">Chat</h2>
          {chats.map((chat) => (
            <div key={chat.id} className="flex items-center justify-between mb-2 group">
              {editingChatId === chat.id ? (
                <Input
                  value={newTitle}
                  onChange={handleTitleChange}
                  onBlur={() => handleTitleBlur(chat.id)}
                  onKeyUp={(e) => handleTitleKeyPress(e, chat.id)}
                  autoFocus
                  className="flex-grow mr-2"
                />
              ) : (
                <Link
                  to={`/u/${chat.id}`}
                  className="block p-2 hover:bg-gray-700 rounded-md flex-grow truncate"
                >
                  {chat.name}
                </Link>
              )}
              <Dropdown>
                <DropdownTrigger>
                  <Button 
                    isIconOnly 
                    variant="light" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FontAwesomeIcon icon={faEllipsisH} className="text-white"/>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Chat Actions">
                  <DropdownItem key="rename" startContent={<FontAwesomeIcon icon={faPencilAlt} />} onClick={() => handleEditClick(chat.id, chat.name)}>
                    Rename
                  </DropdownItem>
                  <DropdownItem key="share" startContent={<FontAwesomeIcon icon={faShare} />} onClick={() => handleShareChat(chat.id)}>
                    Share
                  </DropdownItem>
                  <DropdownItem key="delete" startContent={<FontAwesomeIcon icon={faTrash} />} onClick={() => handleDeleteChat(chat.id)}>
                    Delete
                  </DropdownItem>
                  <DropdownItem key="archive" startContent={<FontAwesomeIcon icon={faArchive} />} onClick={() => handleArchiveChat(chat.id)}>
                    Archive
                  </DropdownItem>
                  <DropdownItem key="export" startContent={<FontAwesomeIcon icon={faFileExport} />} onClick={() => handleExportChat(chat.id)}>
                    Export
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;