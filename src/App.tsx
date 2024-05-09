import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import SidebarToggleIcon from "./components/SidebarToggleIcon";
import { SidebarProvider } from './context/SidebarContext';
import { MessagesProvider, useMessages } from "./context/MessagesContext";

const App = () => {
  useEffect(() => {
    console.log('App Mounted');
  }, []);

  return (
    <MessagesProvider>
      <SidebarProvider>
        <Router>
          <div className="flex h-screen bg-white">
            <Sidebar />
            <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
              <SidebarToggleIcon />
              <Routes>
                {/* <Route path="/" element={<Navigate to="/chat/1" />} />
                <Route path="/chat/:chatId" element={<Content />} />
                 */}
                <Route path="/" element={<Content />} />
              </Routes>
            </div>
          </div>
        </Router>
      </SidebarProvider>
    </MessagesProvider>
  );
};

export default App;
