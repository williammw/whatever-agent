// src/components/PromptInput.js
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faMicrophone,
  faScroll,
} from "@fortawesome/free-solid-svg-icons";

import FileUpload from "./FileUpload";

const PromptInput = () => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission of the prompt input
    console.log(input);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-4 rounded-lg">
      <div className="flex items-center text-white">
        {/* Attach button */}
        <FontAwesomeIcon icon={faPaperclip} className="mr-3" />

        {/* Input field */}
        <input
          type="text"
          placeholder="Enter a prompt here"
          className="flex-grow bg-gray-900 rounded-md p-2 text-white"
          value={input}
          onChange={handleInputChange}
        />

        {/* Voice command button */}
        <FontAwesomeIcon icon={faMicrophone} className="ml-3" />

        {/* Templates button */}
        <FontAwesomeIcon icon={faScroll} className="ml-3" />
      </div>
    </form>
  );
};

export default PromptInput;
