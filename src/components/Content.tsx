import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Message from "./Message";
import Navbar from "./Navbar";
import PromptInput from "./PromptInput";
import { useMessages } from "../context/MessagesContext";

const Content: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { chats } = useMessages();
  const chat = chats.find((chat) => chat.id === chatId); // Ensure this matches the string format
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const navbarHeight = "50px"; // Replace with your actual navbar height
  const promptInputHeight = "76px"; // Replace with your actual prompt input height

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat?.messages]);

  useEffect(() => {
    console.log('chatId:', chatId);
    console.log('chats:', chats);
    console.log('chat:', chat);
  }, [chatId, chats, chat]);

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="flex-grow overflow-y-auto pt-4">
          <div
            style={{
              height: `calc(100vh - ${navbarHeight} - ${promptInputHeight})`,
            }}
            className="overflow-y-auto hide-scrollbar"
          >
            {(!chat || chat.messages.length === 0) ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-xl">Hi, please say something!</p>
              </div>
            ) : (
              chat.messages.map((message, index) => (
                <div key={message.id} style={{ paddingTop: index === 0 ? "60px" : "0" }}>
                  <div className="text-left text-xs text-token-text-secondary pt-4">
                    <Message {...message} />
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="sticky bottom-0 w-[80%] mx-auto pb-4 z-10">
          <PromptInput chatId={chat ? chat.id : undefined} />
          <div className="relative px-2 py-2 text-center text-xs text-token-text-secondary md:px-[60px] bg-white"></div>
        </div>
      </div>
    </>
  );
};

export default Content;
