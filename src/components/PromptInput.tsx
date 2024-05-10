import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faMicrophone, faTurnUp } from "@fortawesome/free-solid-svg-icons";
import { useMessages } from "../context/MessagesContext";
import { fetchResponse } from "../services/apiService";

interface PromptInputProps {
  chatId: number;
}

const PromptInput: React.FC<PromptInputProps> = ({ chatId }) => {
  const [input, setInput] = useState<string>("");
  const { addMessageToChat, updateMessage } = useMessages();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userMessageId = new Date().getTime(); // Unique temporary ID for the user message
    const botMessageId = userMessageId + 1; // Ensure a unique ID for the bot's message

    addMessageToChat(chatId, {
      id: userMessageId,
      username: "User",
      text: input,
      role: "user",
      avatar: "https://i.pravatar.cc/300",
    });

    setInput("");

    addMessageToChat(chatId, {
      id: botMessageId,
      username: "iBuu",
      text: "",
      role: "bot",
      avatar: "https://i.pravatar.cc/300",
      loading: true,
    });

    try {
      const data = await fetchResponse(input);

      updateMessage(chatId, botMessageId, {
        text: data.text,
        audioUrl: data.audio,
        loading: false,
      });
    } catch (error) {
      updateMessage(chatId, botMessageId, { text: "Error occurred", loading: false });
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
