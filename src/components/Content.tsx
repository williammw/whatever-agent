import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Message from "./Message";
import Navbar from "./Navbar";
import { useMessages } from "../context/MessagesContext";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
const Content: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { chats } = useMessages();
  const chat = chats.find((chat) => chat.id === chatId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef(null);
  // useEffect(() => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [chat?.messages]);

  useEffect(() => {
    console.log('chatId:', chatId);
    console.log('chats:', chats);
    console.log('chat:', chat);
  }, [chatId, chats, chat]);

  

  useEffect(() => {
    if (scrollbarRef.current) {
      const ps = scrollbarRef.current._ps;
      
      // Customize scroll rate by overriding the scroll method
      const originalScrollTop = ps.scrollTop;
      ps.scrollTop = (y, options = {}) => {
        const { speed = 1 } = options; // Add a speed option
        originalScrollTop.call(ps, y * speed, options);
      };
    }
  }, []);

  return (
  <PerfectScrollbar ref={scrollbarRef}>
      {/* <div className="flex h-full flex-col">         */}
          <div className="flex-grow overflow-y-auto pt-4">
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
        
      {/* </div> */}
   </PerfectScrollbar>
  );
};

export default Content;
