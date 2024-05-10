import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSidebar } from "../context/SidebarContext";
import { Image } from "@nextui-org/react";
import { useMessages } from "../context/MessagesContext";
import { DateRangePicker } from "@nextui-org/date-picker";
import logo from "../assets/logo.png";

const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { chats, addChat } = useMessages();
  const navigate = useNavigate();

  const handleCreateChat = () => {
    const newChat = {
      id: new Date().getTime(),
      name: `Chat ${new Date().toLocaleString()}`,
      messages: [],
    };
    addChat(newChat);
    navigate(`/chat/${newChat.id}`);
  };

  return (
    <div
      className={`h-full min-h-screen transition-all duration-300 ${
        isSidebarOpen ? "w-80" : "w-0"
      } bg-gray-800 text-white flex flex-col`}
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

      <div className="p-4">
        <DateRangePicker label="Stay duration" className="max-w-xs w-full" />
      </div>

      <div className="flex-grow overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Chat</h2>
          {chats.map((chat) => (
            <Link
              key={chat.id}
              to={`/chat/${chat.id}`}
              className="block p-2 hover:bg-gray-700 rounded-md"
            >
              {chat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
