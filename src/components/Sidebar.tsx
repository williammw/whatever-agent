import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSidebar } from "../context/SidebarContext";
import { Image } from "@nextui-org/react";
import { DateRangePicker } from "@nextui-org/date-picker";
import logo from "../assets/logo.png";

const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div
      className={`h-full min-h-screen transition-all duration-300 ${
        isSidebarOpen ? "w-80" : "w-0"
      } bg-gray-800 text-white flex flex-col`}
    >
      {/* First Row: Logo, App Name, Create Icon */}
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
          />
          <FontAwesomeIcon
            icon={faTimes}
            onClick={toggleSidebar}
            className="cursor-pointer ml-4 text-xl"
          />
        </div>
      </div>

      {/* Second Row: Date Picker */}
      <div className="">
        <DateRangePicker 
          label="Stay duration" 
          className="max-w-xs pl-4 pr-4" 
        />
      </div>

      {/* Third Row: Chat Section */}
      <div className="flex-grow overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Chat</h2>
          <Link to="/" className="block p-2 hover:bg-gray-700 rounded-md">
            Home
          </Link>
          <Link to="/news" className="block p-2 hover:bg-gray-700 rounded-md">
            Consolidate News
          </Link>
          <Link to="/umami" className="block p-2 hover:bg-gray-700 rounded-md">
            Project Umami
          </Link>
          <Link to="/fortune" className="block p-2 hover:bg-gray-700 rounded-md">
            Project Fortune Telling
          </Link>
          {/* Add more links as needed */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
