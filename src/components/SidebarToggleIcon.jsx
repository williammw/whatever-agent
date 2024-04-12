import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useSidebar } from "../context/SidebarContext";

const SidebarToggleIcon = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  return (
    <div
      className="fixed left-0 top-1/2 z-40"
      style={{
        transform: isSidebarOpen
          ? "translateX(260px) translateY(-50%) rotate(0deg) translateZ(0px)"
          : "translateX(10px) translateY(-50%) rotate(0deg) translateZ(0px)",
      }}
    >
      <button onClick={toggleSidebar}>
        <FontAwesomeIcon
          icon={isSidebarOpen ? faChevronLeft : faChevronRight}
          className="cursor-pointer"
        />
      </button>
    </div>
  );
};

export default SidebarToggleIcon;
