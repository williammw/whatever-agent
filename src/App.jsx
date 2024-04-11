
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import PromptInput from "./components/PromptInput";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-white">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <Navbar />
          <Routes>
            {/* Add your routes here */}
            <Route path="/" element={<Content />} />
            {/* Other routes can be added here */}
          </Routes>
          <div className="sticky bottom-0 w-full">
            <PromptInput />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
