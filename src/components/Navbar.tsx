import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../context/SidebarContext';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm h-14 flex items-center justify-between px-4">
      <div className="flex items-center">
        {/* <Button color="primary"
          onClick={toggleSidebar}
          variant="light"
          isIconOnly
          className={`flex item-center transition-opacity duration-300  ${isSidebarOpen ? "invisible" : ""}`}>
          <FontAwesomeIcon
            icon={faBars}
            className="text-gray-600"
          />
        </Button> */}
      </div>
      {currentUser && (
        <div className="flex items-center">
          <img
            src={currentUser.photoURL ?? 'https://i.pravatar.cc/300'}
            alt={currentUser.displayName ?? 'User Avatar'}
            className="w-8 h-8 rounded-full mr-2"
          />
          <span className="mr-4 text-sm">{currentUser.displayName ?? 'Username'}</span>
          <Button color="primary" variant="light" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;