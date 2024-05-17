import { useState } from 'react';

const useSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    console.log('toggle sidebar is clicked')
    setIsSidebarOpen((prev) => !prev);
  };

  return {
    isSidebarOpen,
    toggleSidebar,
    setIsSidebarOpen, // Exp
  };
};

export default useSidebar;
