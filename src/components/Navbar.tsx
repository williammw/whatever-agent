import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";
import { useSidebar } from '../context/SidebarContext'; // Import the custom hook

const Navbar: React.FC = () => {
  const { toggleSidebar } = useSidebar(); // Use the custom hook
  // alert("i am here")
  return (
    <div className="sticky top-0 z-50 text-gray-800 pr-4 flex justify-between items-center bg-white p-4 ">
      {/* Left side - Toggle sidebar */}
      <div className="flex">
        <FontAwesomeIcon
          icon={faBars}
          onClick={toggleSidebar}
          className="cursor-pointer ml-2 text-lg "
        />
      </div>
      { /* show the title*/}
      <div className="text-lg font-semibold ml-2">Umami</div>
      {/* Right side - Share button */}
      <div className="bg-white w-[80%] h-[100%]"></div>
      <Button auto flat bordered color="primary" variant="faded">
        <FontAwesomeIcon icon={faShareNodes} className="text-gray-800" />
      </Button>
    </div>
  );
};

export default Navbar;
