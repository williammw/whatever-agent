import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faMicrophone, faTurnUp } from "@fortawesome/free-solid-svg-icons";
import { useMessages } from "../context/MessagesContext";

const PromptInput: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { addMessage } = useMessages();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMessage({
      username: "User",
      text: input,
      role: "user",
      avatar: "https://i.pravatar.cc/300",
    });
    setInput("");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/v1/agents/text_to_speech_pipeline/", { text: input });
      addMessage({
        username: "iBuu",
        text: response.data.text,
        role: "bot",
        avatar: "https://i.pravatar.cc/300",
        audioUrl: response.data.audio,
      });
      setLoading(false);
    } catch (error) {
      console.error("There was an error!", error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-4 rounded-lg">
      <div className="flex items-center text-white">
        <FontAwesomeIcon icon={faPaperclip} className="mr-3" />
        <textarea
          placeholder="Enter a prompt here"
          className="flex-grow bg-gray-900 rounded-md p-2 text-white"
          value={input}
          onChange={handleInputChange}
        />
        <FontAwesomeIcon icon={faMicrophone} className="ml-3" />
        <button type="submit">
          <FontAwesomeIcon icon={faTurnUp} className="ml-3" />
        </button>
      </div>
    </form>
  );
};

export default PromptInput;
