// src/components/Message.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
const Message = ({ text, sender, username, avatar, audioUrl }) => {
  const handleAudioPlay = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio
        .play()
        .catch((error) => console.error("Error playing the audio:", error));
    }
  };
  

  

  const formattedText = text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

   
  return (
    <div className="w-full text-token-text-primary">
      {/* Container for the entire message */}
      <div className="flex flex-col mx-auto gap-3 md:gap-4 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
        {/* First row for avatar and username */}
        {/* ... */}
        <img
          src={avatar}
          alt={`${username}'s avatar`}
          className="w-8 h-8 rounded-full"
        />
        {/* Second row for message text */}
        <div className="bg-gray-100 text-sm p-3 rounded-lg break-words w-full mt-2 message-text">
          {formattedText}
          {audioUrl && (
            <button onClick={() => handleAudioPlay(audioUrl)} className="ml-2">
              <FontAwesomeIcon
                icon={faPlayCircle}
                className="text-blue-500 cursor-pointer"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
// ...

  Message.propTypes = {
    text: PropTypes.string.isRequired,
    sender: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string,
    audioUrl: PropTypes.string,
    
    // ... other props
  };

export default Message;
