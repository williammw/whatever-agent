import  { createContext, useState, useContext } from "react";

// Create a context for the messages
const MessagesContext = createContext();

// Custom hook to use the MessagesContext
export const useMessages = () => useContext(MessagesContext);

// Provider component
export const MessagesProvider = ({ children }) => {
  // TODO require redesign the message object
  const [messages, setMessages] = useState([
    {
      id: 1,
      username: "iBuu",
      text: "Hello! How can I assist you today?",
      role: "bot",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    // ...any other initial messages
  ]);

  // Function to add a new message
  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { ...newMessage, id: prevMessages.length + 1 },
    ]);
  };

  return (
    <MessagesContext.Provider value={{ messages, addMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};
