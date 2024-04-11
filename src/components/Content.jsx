// src/components/Content.jsx
import Message from "./Message";
// Simulated message data
const messages = [
  { id: 1, username:"iBuu",text: "Hello! How can I assist you today?", sender: "bot", avatar: "https://i.pravatar.cc/150?img=1"},
  { id: 2, username: "John", text: "I need help with my account.", sender: "user", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, username: "Sarah", text: "Can you help me with the payment process?", sender: "user", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, username: "Alex", text: "How long does shipping usually take?", sender: "user", avatar: "https://i.pravatar.cc/150?img=4" },
  { id: 5, username: "Emily", text: "I'm having trouble logging in.", sender: "user", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: 6, username: "David", text: "Do you have any discounts available?", sender: "user", avatar: "https://i.pravatar.cc/150?img=6" },
  { id: 7, username: "Sophia", text: "What are your return policies?", sender: "user", avatar: "https://i.pravatar.cc/150?img=7" },
  { id: 8, username: "Oliver", text: "Can I change my shipping address?", sender: "user", avatar: "https://i.pravatar.cc/150?img=8" },
  { id: 9, username: "Emma", text: "Is there a customer support number I can call?", sender: "user", avatar: "https://i.pravatar.cc/150?img=9" },
  { id: 10, username: "William", text: "How do I track my order?", sender: "user", avatar: "https://i.pravatar.cc/150?img=10" },
  { id: 11, username: "Ava", text: "I forgot my password. What should I do?", sender: "user", avatar: "https://i.pravatar.cc/150?img=11" },
  { id: 12, username: "James", text: "Are there any promotions currently running?", sender: "user", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: 13, username: "Isabella", text: "Can I cancel my order?", sender: "user", avatar: "https://i.pravatar.cc/150?img=13" },
  { id: 14, username: "Benjamin", text: "What payment methods do you accept?", sender: "user", avatar: "https://i.pravatar.cc/150?img=14" },
  { id: 15, username: "Mia", text: "How can I contact your support team?", sender: "user", avatar: "https://i.pravatar.cc/150?img=15" },
  { id: 16, username: "Henry", text: "Do you offer international shipping?", sender: "user", avatar: "https://i.pravatar.cc/150?img=16" },
  { id: 17, username: "Charlotte", text: "What is your refund policy?", sender: "user", avatar: "https://i.pravatar.cc/150?img=17" },
  { id: 18, username: "Michael", text: "Can I change my order after it has been placed?", sender: "user", avatar: "https://i.pravatar.cc/150?img=18" },
  { id: 19, username: "Liam", text: "How do I update my account information?", sender: "user", avatar: "https://i.pravatar.cc/150?img=19" },
  { id: 20, username: "Amelia", text: "Are there any size charts available?", sender: "user", avatar: "https://i.pravatar.cc/150?img=20" },
  { id: 21, username: "Daniel", text: "What is the status of my order?", sender: "user", avatar: "https://i.pravatar.cc/150?img=21" },
  { id: 22, username: "Evelyn", text: "How do I return an item?", sender: "user", avatar: "https://i.pravatar.cc/150?img=22" },
  { id: 23, username: "Alexander", text: "Can I add items to an existing order?", sender: "user", avatar: "https://i.pravatar.cc/150?img=23" },
  { id: 24, username: "Harper", text: "What is your privacy policy?", sender: "user", avatar: "https://i.pravatar.cc/150?img=24" },
  { id: 25, username: "Sebastian", text: "How do I unsubscribe from your newsletter?", sender: "user", avatar: "https://i.pravatar.cc/150?img=25" },
  { id: 26, username: "Abigail", text: "Do you offer gift wrapping?", sender: "user", avatar: "https://i.pravatar.cc/150?img=26" },
  { id: 27, username: "Jack", text: "What are your shipping fees?", sender: "user", avatar: "https://i.pravatar.cc/150?img=27" },
  { id: 28, username: "Elizabeth", text: "Can I change the color of an item after ordering?", sender: "user", avatar: "https://i.pravatar.cc/150?img=28" },
  { id: 29, username: "Owen", text: "How do I leave a product review?", sender: "user", avatar: "https://i.pravatar.cc/150?img=29" },
  { id: 30, username: "Sofia", text: "What are your contact hours?What are your contact hours?", sender: "user", avatar: "https://i.pravatar.cc/150?img=30" }
  
];

const Content = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full flex-grow pt-[heightOfNavbar] px-4 pb-2 overflow-y-auto">
      {messages.map((message) => (
        <Message key={message.id} {...message} />
      ))}
    </div>
  );
};

export default Content;
