// src/components/Message.jsx
import React from "react";

const Message = ({ text, sender, username, avatar }) => {
  return (
    <div className="w-full text-token-text-primary">
      <div className="px-4 py-2 justify-center text-base md:gap-6 m-auto">
        {/* Container for the entire message */}
        <div className="flex flex-col mx-auto gap-3 md:gap-4 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
          {/* First row for avatar and username */}
          <div className="flex items-center">
            <img
              src={avatar}
              alt={`${username}'s avatar`}
              className="w-8 h-8 rounded-full"
            />
            <span className="ml-2 text-sm font-semibold">{username}</span>
          </div>
          {/* Second row for message text */}
          <div className="bg-gray-100 text-sm p-3 rounded-lg break-words w-full mt-2">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
