import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faMicrophone, faTurnUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useMessages } from "../context/MessagesContext";
import { fetchResponse } from "../services/apiService";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

interface PromptInputProps {
  chatId?: string; // Change chatId type to string
}

const PromptInput: React.FC<PromptInputProps> = ({ chatId }) => {
  const [input, setInput] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { chats, addChat, addMessageToChat, updateMessage } = useMessages();
  const navigate = useNavigate();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to auto to calculate scroll height correctly
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scrollHeight
    }
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userMessageId = new Date().getTime(); // Unique temporary ID for the user message
    const botMessageId = userMessageId + 1; // Ensure a unique ID for the bot's message

    let targetChatId = chatId;

    if (!targetChatId) {
      const newChatId = uuidv4(); // Generate a new UUID for the chat
      const newChat = {
        id: newChatId,
        name: `Chat ${new Date().toLocaleString()}`,
        messages: [],
      };
      addChat(newChat);
      targetChatId = newChatId;
      navigate(`/u/${newChatId}`); // Navigate to the new chat
    }

    addMessageToChat(targetChatId ?? "", {
      id: userMessageId,
      username: "User",
      text: input,
      role: "user",
      avatar: "https://i.pravatar.cc/300",
    });

    setInput("");

    if (!targetChatId) {
      const newChatId = uuidv4(); // Generate a new UUID for the chat
      const newChat = {
        id: newChatId,
        name: `Chat ${new Date().toLocaleString()}`,
        messages: [],
      };
      addChat(newChat);
      targetChatId = newChatId;
      navigate(`/u/${newChatId}`); // Navigate to the new chat
    }

    addMessageToChat(targetChatId ?? "", {
      id: botMessageId,
      username: "iBuu",
      text: "",
      role: "bot",
      avatar: "https://i.pravatar.cc/300",
      loading: true,
    });

    try {
      const data = await fetchResponse(input);

      updateMessage(targetChatId ?? "", botMessageId, {
        text: data.text,
        audioUrl: data.audio,
        loading: false,
      });
    } catch (error) {
      updateMessage(targetChatId ?? "", botMessageId, { text: "Error occurred", loading: false });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg">
      <div className="flex items-center text-gray-900">
        <FontAwesomeIcon icon={faPaperclip} className="mr-3 text-2xl" />
        <div
          className={`flex-grow rounded-md p-2 ${isFocused ? 'border-2 border-gray-400' : 'border border-gray-300'}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <textarea
            ref={textareaRef}
            placeholder="Enter a prompt here"
            className="flex-grow bg-transparent p-2 text-gray-900 placeholder-gray-400 resize-none h-12 text-base focus:outline-none"
            value={input}
            onChange={handleInputChange}
            style={{
              overflow: "hidden", // Hide scroll bar
              whiteSpace: "pre-wrap", // Handle new lines properly
              border: "none", // Remove border
              outline: "none", // Remove outline
            }}
            rows={1}
          />
        </div>
        <FontAwesomeIcon icon={faMicrophone} className="ml-3 text-2xl" />
        <button type="submit">
          <FontAwesomeIcon icon={faTurnUp} className="ml-3 text-2xl" />
        </button>
      </div>
    </form>
  );
};

export default PromptInput;
