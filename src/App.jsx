import { useState } from "react";
import Sidebar from "./components/Sidebar";
import "./App.css"; // Ensure you've updated your CSS file accordingly
import Chat from "./components/Chat";
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="app">
      <div className={`sidebar ${isSidebarOpen ? "" : "closed"}`}>
        <Sidebar />
      </div>
      <button
        className="toggle-button"
        style={{
          transform: `translateY(-50%) translateX(${
            isSidebarOpen ? "260px" : "0px"
          })`,
        }}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Sidebar"
      >
        <span className="material-icons">
          {isSidebarOpen ? "menu_open" : "menu"}
        </span>
      </button>

      {/* the chat-content doesnt change the width if sidebar toggled */}
      <div
        className={`chat ${
          isSidebarOpen ? "chat-content" : "chat-content closed"
        }`}
      >
        <Chat />
      </div>
    </div>
  );
}

export default App;
