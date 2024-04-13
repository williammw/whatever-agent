// src/components/Content.jsx
import { useEffect, useRef } from "react";
import Message from "./Message";
import Navbar from "./Navbar";
import PromptInput from "./PromptInput";
import { useMessages } from "../context/MessagesContext";
// Simulated message data
import Tmessages from "./Tmessage";
const Content = () => {
  const { messages } = useMessages();
  const messagesEndRef = useRef(null);

  const navbarHeight = "50px"; // Replace with your actual navbar height
  const promptInputHeight = "76px"; // Replace with your actual prompt input height
  // Scroll to the bottom every time messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col ">
        {/* Use remaining height minus the height of the navbar and prompt input */}
        <div className="flex-grow overflow-y-auto pt-4 ">
          <div
            style={{
              height: `calc(100vh - ${navbarHeight} - ${promptInputHeight})`,
            }}
            className="overflow-y-auto hide-scrollbar"
          >
            {messages.map((message, index) => (
              <div
                key={message.id}
                style={{ paddingTop: index === 0 ? "44px" : "0" }}
              >
                <Message {...message} />
              </div>
            ))}
            {/* Invisible div to auto-scroll to */}
            <div ref={messagesEndRef} />
            <div />
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 w-[80%] mx-auto pb-4 z-10">
        <PromptInput />
        <div className="relative px-2 py-2 text-center text-xs text-token-text-secondary md:px-[60px] bg-white"></div>
      </div>
    </>
  );
};

export default Content;
  