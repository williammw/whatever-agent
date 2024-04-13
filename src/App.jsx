
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import SidebarToggleIcon from "./components/SidebarToggleIcon";
import { SidebarProvider } from './context/SidebarContext';
import { MessagesProvider } from "./context/MessagesContext";




const App = () => {
  
  
  
  return (
    <MessagesProvider>
      <SidebarProvider>
        <Router>
          <div className="flex h-screen bg-white">
            <Sidebar />

            <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
              
                <SidebarToggleIcon />
                <Routes>
                  {/* Define your routes within this Routes component */}
                  <Route path="/" element={<Content />} />
                  {/* Ensure other routes are defined if there are other components to route */}
                  {/* Example: */}
                  {/* <Route path="/about" element={<About />} /> */}
                </Routes>
              
            </div>
          </div>
        </Router>
      </SidebarProvider>
    </MessagesProvider>
  );
};

export default App;
