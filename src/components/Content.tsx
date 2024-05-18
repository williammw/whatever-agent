import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Message from "./Message";
import { useMessages } from "../context/MessagesContext";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

const Content: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { chats } = useMessages();
  const chat = chats.find((chat) => chat.id === chatId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('chatId:', chatId);
    console.log('chats:', chats);
    console.log('chat:', chat);
  }, [chatId, chats, chat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat?.messages]);

  return (
    <PerfectScrollbar>
      <div className="flex-grow overflow-y-auto pt-4 h-full">
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
    </PerfectScrollbar>
  );
};

export default Content;
