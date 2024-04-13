// src/components/Content.jsx
import Message from "./Message";
import Navbar from "./Navbar";
import PromptInput from "./PromptInput";
import { useMessages } from "../context/MessagesContext";
// Simulated message data
// const messages = [
//   { id: 1, username:"iBuu",text: "Hello! How can I assist you today?", sender: "bot", avatar: "https://i.pravatar.cc/150?img=1"}, 
// ];

const Content = () => {
    const { messages } = useMessages();

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center w-full flex-grow pt-[heightOfNavbar] px-4 pb-2 overflow-y-auto">
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
      </div>
      
      <div className="sticky bottom-0 w-[80%] mx-auto">
        <PromptInput />
        <div className="relative px-2 py-2 text-center text-xs text-token-text-secondary md:px-[60px]" ></div>
      </div>
    </>
  );
};

export default Content;
