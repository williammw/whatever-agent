// src/components/Navbar.jsx
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 text-white pr-4  flex justify-between items-center">
      
        {/* Left side - Dropdown menu */}
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light">Open Menu</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="new" shortcut="⌘N">
              Professional
            </DropdownItem>
            <DropdownItem key="copy" shortcut="⌘C">
              Epic
            </DropdownItem>
            <DropdownItem key="edit" shortcut="⌘E">
              Legendary
            </DropdownItem>
            <DropdownItem
              key="delete"
              shortcut="⌘D"
              className="text-danger"
              color="danger"
            >
              Delete file
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* Right side - Share button */}
      <div className='bg-white w-[80%] h-[100%]'>sss</div>
      <Button auto flat bordered color="light" variant="faded">
        <FontAwesomeIcon icon={faShareNodes} className="text-gray-800" />
      </Button>
    </div>
  );
};

export default Navbar;
