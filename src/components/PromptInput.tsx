import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faMicrophone, faTurnUp } from "@fortawesome/free-solid-svg-icons";
import { useMessages } from "../context/MessagesContext";

const PromptInput: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const { addMessage, updateMessage } = useMessages();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userMessageId = new Date().getTime(); // Unique temporary ID for the user message
    const botMessageId = userMessageId + 1; // Ensure a unique ID for the bot's message

    addMessage({
      id: userMessageId,
      username: "User",
      text: input,
      role: "user",
      avatar: "https://i.pravatar.cc/300",
    });

    setInput("");

    addMessage({
      id: botMessageId,
      username: "iBuu",
      text: "",
      role: "bot",
      avatar: "https://i.pravatar.cc/300",
      loading: true,
    });

    try {
      const response = await axios.post("http://localhost:8000/api/v1/agents/text_to_speech_pipeline/", { text: input });

      updateMessage(botMessageId, {
        text: response.data.text,
        audioUrl: response.data.audio,
        loading: false,
      });
    } catch (error) {
      console.error("There was an error!", error);
      updateMessage(botMessageId, { text: "Error occurred", loading: false });
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
