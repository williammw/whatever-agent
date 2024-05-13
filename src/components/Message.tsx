import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle, faThumbsDown, faCopy } from "@fortawesome/free-regular-svg-icons";
import { Skeleton } from "@nextui-org/react";

interface MessageProps {
  text: string;
  role: string; // Ensure role is always provided
  username: string;
  avatar: string;
  audioUrl?: string;
  loading?: boolean;
}

const Message: React.FC<MessageProps> = ({ text, role, username, avatar, audioUrl, loading }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audioUrl));

  const toggleAudioPlay = () => {
    if (audioUrl) {
      const audio = audioRef.current;
      if (!isPlaying) {
        audio.play().then(() => setIsPlaying(true)).catch((error) => console.error("Error playing the audio:", error));
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);
    }
  }, [audioUrl]);

  const formattedText = text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  // Conditionally display elements based on the message role
  const messageLayout = role === "user" ? (
    <div className="flex flex-row-reverse items-center">
      <span className="ml-2 text-sm font-semibold">{username}</span>
      <img src={avatar} alt={`${username}'s avatar`} className="w-8 h-8 rounded-full" />
    </div>
  ) : (
    <div className="flex items-center">
      <img src={avatar} alt="Bot avatar" className="w-8 h-8 rounded-full" />
      <span className="ml-2 text-sm font-semibold">Bot</span>
    </div>
  );

  return (
    <div className="w-full text-token-text-primary">
      <div className="flex flex-col mx-auto gap-3 md:gap-4 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] pb-0">
        {messageLayout}
        <div className={`${role === 'user' ? 'text-right ': '' }bg-gray-100 text-sm p-3 rounded-lg break-words w-full mt-2 message-text`}>
          {loading ? (
            <Skeleton className='w-full h-24' />
          ) : (
            formattedText
          )}
        </div>
        {audioUrl && !loading && (
          <div className='icon set'>
            <div className="flex items-center gap-2"></div>
            <button onClick={toggleAudioPlay} className="ml-2">
              <FontAwesomeIcon
                icon={faPlayCircle}
                className="cursor-pointer w-4 h-4 fa-fw" // Add fa-fw class
              />
            </button>
            <button className="ml-2">
              <FontAwesomeIcon
                icon={faThumbsDown}
                className="cursor-pointer w-4 h-4 fa-fw" // Add fa-fw class
              />
            </button>
            <button className="ml-2">
              <FontAwesomeIcon
                icon={faCopy}
                className="cursor-pointer w-4 h-4 fa-fw" // Add fa-fw class
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
