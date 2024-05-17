import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface SidebarToggleButtonProps {
  toggleSidebar: () => void;
}

const SidebarToggleButton: React.FC<SidebarToggleButtonProps> = ({
  toggleSidebar,
}) => {
  return (
    <button onClick={toggleSidebar} className="p-2 text-white">
      <FontAwesomeIcon icon={faBars} className="text-xl" />
    </button>
  );
};

export default SidebarToggleButton;
