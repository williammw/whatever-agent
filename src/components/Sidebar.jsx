// src/components/Sidebar.js
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-full min-h-screen w-60 bg-gray-800 text-white flex flex-col">
      {/* ... Your sidebar content, like logo, navigation items, etc. */}
      <Link to="/" className="p-4 hover:bg-gray-700">
        Home
      </Link>
      <Link to="/about" className="p-4 hover:bg-gray-700">
        About
      </Link>
      {/* ... more navigation items */}
    </div>
  );
};

export default Sidebar;
