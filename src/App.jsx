
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import SidebarToggleIcon from "./components/SidebarToggleIcon";
import { SidebarProvider } from './context/SidebarContext';



const App = () => {
  
  
  
  return (
    <SidebarProvider>
      <Router>
        <div className="flex h-screen bg-white">
          <Sidebar />

          <div className="relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
            <div className="relative h-full w-full flex-1 overflow-auto">
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
        </div>
      </Router>
    </SidebarProvider>
  );
};

export default App;
