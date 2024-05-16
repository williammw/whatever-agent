import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faMicrophone, faTurnUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useMessages } from "../context/MessagesContext";
import { fetchResponse } from "../services/apiService";
import { v4 as uuidv4 } from 'uuid';
import { Textarea } from "@nextui-org/react";

interface PromptInputProps {
  chatId?: string;
}

const PromptInput: React.FC<PromptInputProps> = ({ chatId }) => {
  const [input, setInput] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { chats, addChat, addMessageToChat, updateMessage } = useMessages();
  const navigate = useNavigate();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userMessageId = new Date().getTime();
    const botMessageId = userMessageId + 1;

    let targetChatId = chatId;

    if (!targetChatId) {
      const newChatId = uuidv4();
      const newChat = {
        id: newChatId,
        name: `Chat ${new Date().toLocaleString()}`,
        messages: [],
      };
      addChat(newChat);
      targetChatId = newChatId;
      navigate(`/u/${newChatId}`);
    }

    addMessageToChat(targetChatId, {
      id: userMessageId,
      username: "User",
      text: input,
      role: "user",
      avatar: "https://i.pravatar.cc/300",
    });

    setInput(""); // Clear input after submitting

    addMessageToChat(targetChatId, {
      id: botMessageId,
      username: "iBuu",
      text: "",
      role: "bot",
      avatar: "https://i.pravatar.cc/300",
      loading: true,
    });

    try {
      const data = await fetchResponse(input);

      updateMessage(targetChatId, botMessageId, {
        text: data.text,
        audioUrl: data.audio,
        loading: false,
      });
    } catch (error) {
      updateMessage(targetChatId, botMessageId, { text: "Error occurred", loading: false });
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
          <Textarea
            ref={textareaRef}
            variant="faded"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter a prompt here"
            className="col-span-12 md:col-span-6 mb-6 md:mb-0"
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
