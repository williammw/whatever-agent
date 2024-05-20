import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";
import { useSidebar } from '../context/SidebarContext';
import { useAuth } from '../context/AuthContext'; // Import the custom hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Navbar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const { user, logout } = useAuth(); // Use the custom hook
  const navigate = useNavigate(); // Use useNavigate for redirection

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="sticky top-0 z-50 text-gray-800 pr-4 flex justify-between items-center bg-white p-4 ">
      {/* Left side - Toggle sidebar */}
      <div className={`flex item-center transition-opacity duration-300  ${isSidebarOpen ? "invisible" : ""}`}>
        <FontAwesomeIcon
          icon={faBars}
          onClick={toggleSidebar}
          className="cursor-pointer text-lg"
        />
      </div>

      {/* Right side - Share button, avatar, username, and logout */}
      <div className="flex items-center">
        <Button    color="primary" variant="faded" className="mr-4">
          <FontAwesomeIcon icon={faShareNodes} className="text-gray-800" />
        </Button>
        {user && (
          <div className="flex items-center">
            <img
              src={user.photoURL ?? 'https://i.pravatar.cc/300'}
              alt={user.displayName ?? 'User Avatar'}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="mr-4">{user.displayName ?? 'Username'}</span>
            <Button    color="primary" variant="faded" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
