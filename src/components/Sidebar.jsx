// src/components/Sidebar.jsx
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useSidebar } from "../context/SidebarContext";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();



  return (
    <>
      <div
        className={`h-full min-h-screen ${
          isSidebarOpen ? "w-60" : "w-0"
        } bg-gray-800 text-white flex flex-col`}
      >
        {/* Your sidebar content */}
        <div className="flex justify-between items-center p-4 ">
          <span className="text-xl font-semibold">Whatever Agent</span>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={toggleSidebar}
            className="cursor-pointer"
          />
        </div>
        <Link to="/" className="p-4 hover:bg-gray-700">
          Home
        </Link>
        <Link to="/news" className="p-4 hover:bg-gray-700">
          consolidate news
        </Link>
        <Link to="/umami" className="p-4 hover:bg-gray-700">
          Umami
        </Link>
        <Link to="/fortune" className="p-4 hover:bg-gray-700">
          Fortune Telling
        </Link>
        
        {/* ... more navigation items */}
      </div>
    </>
  );
};

export default Sidebar;
