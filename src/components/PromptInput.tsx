import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faTurnUp, faStop } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useMessages } from "../context/MessagesContext";
import { v4 as uuidv4 } from 'uuid';
import { Textarea } from "@nextui-org/react";
import { fetchResponseStream } from "../services/apiService";

interface PromptInputProps {
  chatId?: string;
}

const PromptInput: React.FC<PromptInputProps> = ({ chatId }) => {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isStopped, setIsStopped] = useState<boolean>(false);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
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
    setLoading(true);
    setIsStopped(false);

    const userMessageId = new Date().getTime();
    const botMessageId = userMessageId + 1;

    let targetChatId = chatId;

    if (!targetChatId || !chats.some(chat => chat.id === targetChatId)) {
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

    setInput("");

    addMessageToChat(targetChatId, {
      id: botMessageId,
      username: "iBuu",
      text: "",
      role: "bot",
      avatar: "https://i.pravatar.cc/300",
      loading: true,
    });

    const es = await fetchResponseStream(input);
    setEventSource(es);

    let botText = "";

    es.onopen = () => {
      console.log('EventSource connection opened');
    };

    es.onmessage = (event) => {
      if (isStopped) {
        es.close();
        return;
      }

      let rawData = event.data;
      try {
        console.log(rawData);
        
        if (rawData.startsWith("[AUDIO]")) {
          const audioBase64 = rawData.replace("[AUDIO]", "");
          const audioUrl = `data:audio/mp3;base64,${audioBase64}`;
          updateMessage(targetChatId, botMessageId, { audioUrl, loading: false });
          es.close();
          setLoading(false);
        } else {
          const parsedData = JSON.parse(rawData);
          const { content } = parsedData.message;

          if (content) {
            botText += content;
            updateMessage(targetChatId, botMessageId, { text: botText });
          }

          if (parsedData.message.finish_reason === 'stop') {
            es.close();
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error parsing message:', error);
        es.close();
        setLoading(false);
      }
    };

    es.onerror = (error) => {
      console.error('EventSource failed:', error);
      updateMessage(targetChatId, botMessageId, { text: "Error occurred", loading: false });
      es.close();
      setLoading(false);
    };
  };

  const handleStop = () => {
    if (eventSource) {
      eventSource.close();
      setIsStopped(true);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg">
      <div className="flex items-center text-gray-900">
        <FontAwesomeIcon icon={faPaperclip} className="mr-3 text-2xl" />
        <div className="w-[80%]">
          <Textarea
            ref={textareaRef}
            variant="faded"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter a prompt here"
            className="flex-grow rounded-md p-2 col-span-12 md:col-span-6 mb-6 md:mb-0 text-base leading-6"
          />
        </div>
        <button type="submit" disabled={loading}>
          <FontAwesomeIcon icon={faTurnUp} className="ml-3 text-2xl" />
        </button>
        {loading && (
          <button type="button" onClick={handleStop} className="ml-2">
            <FontAwesomeIcon icon={faStop} className="text-2xl" />
          </button>
        )}
      </div>
    </form>
  );
};

export default PromptInput;
