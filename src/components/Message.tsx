import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle } from "@fortawesome/free-solid-svg-icons";

interface MessageProps {
  text: string;
  role?: string;
  username: string;
  avatar: string;
  audioUrl?: string;
}

const Message: React.FC<MessageProps> = ({ text, role, username, avatar, audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audioUrl));

  const toggleAudioPlay = () => {
    if (audioUrl) {
      const audio = audioRef.current;
      if (!isPlaying) {
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.error("Error playing the audio:", error));
      } else {
        audio.pause();
        setIsPlaying(false);
      }
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
      <div className="flex flex-col mx-auto gap-3 md:gap-4 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] pb-0">
        <img
          src={avatar}
          alt={`${username}'s avatar`}
          className="w-8 h-8 rounded-full"
        />
        <div className="bg-gray-100 text-sm p-3 rounded-lg break-words w-full mt-2 message-text">
          {formattedText}
          {audioUrl && (
            <button onClick={toggleAudioPlay} className="ml-2">
              <FontAwesomeIcon
                icon={isPlaying ? faPauseCircle : faPlayCircle}
                className="text-blue-500 cursor-pointer"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
