// src/components/PromptInput.js
import { useState } from "react";
import FileUpload from "./FileUpload";

const PromptInput = () => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the submission of the prompt
    console.log(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-4 rounded-lg">
      <FileUpload />
      <div className="flex mt-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt here"
          className="flex-grow p-2 bg-gray-800 text-white rounded-md mr-2"
        />
        <button
          type="submit"
          className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default PromptInput;
