import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Message from "./Message";
import Navbar from "./Navbar";
import PromptInput from "./PromptInput";
import { useMessages } from "../context/MessagesContext";

const Content: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { chats } = useMessages();
  const chat = chats.find((chat) => chat.id === Number(chatId));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const navbarHeight = "50px"; // Replace with your actual navbar height
  const promptInputHeight = "76px"; // Replace with your actual prompt input height

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col">
        <div className="flex-grow overflow-y-auto pt-4">
          <div
            style={{
              height: `calc(100vh - ${navbarHeight} - ${promptInputHeight})`,
            }}
            className="overflow-y-auto hide-scrollbar"
          >
            {chat?.messages.map((message, index) => (
              <div key={message.id} style={{ paddingTop: index === 0 ? "44px" : "0" }}>
                <div className="text-left text-xs text-token-text-secondary pt-4">
                  <Message {...message} />
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 w-[80%] mx-auto pb-4 z-10">
        <PromptInput chatId={Number(chatId)} />
        <div className="relative px-2 py-2 text-center text-xs text-token-text-secondary md:px-[60px] bg-white"></div>
      </div>
    </>
  );
};

export default Content;
