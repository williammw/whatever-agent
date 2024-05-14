import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle, faPauseCircle, faThumbsDown, faCopy } from "@fortawesome/free-regular-svg-icons";
import { Skeleton } from "@nextui-org/react";

interface MessageProps {
  text: string;
  role?: string;
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

  useEffect(() => {
    // Ensure audio is re-initialized on URL change
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

  return (
    <div className="w-full text-token-text-primary">
      <div className="flex flex-col mx-auto gap-3 md:gap-4 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] pb-0">
        {role === "user" ? (
          <div className="flex items-center justify-end">
            <div className="bg-gray-100 text-sm p-3 rounded-lg break-words max-w-[80%] mt-2 message-text">
              {loading ? (
                <Skeleton className='w-full h-24' />
              ) : (
                formattedText
              )}
            </div>
            <span className="ml-2 text-sm font-semibold">{username}</span>
            <img
              src={avatar}
              alt={`${username}'s avatar`}
              className="w-8 h-8 rounded-full ml-2"
            />
          </div>
        ) : (
          <div className="flex items-center">
            <img
              src={avatar}
              alt={`${username}'s avatar`}
              className="w-8 h-8 rounded-full mr-2"
            />
            {/* <span className="mr-2 text-sm font-semibold">{role}</span> */}
            <div className="bg-gray-100 text-sm p-3 rounded-lg break-words max-w-[80%] mt-2 message-text">
              {loading ? (
                <Skeleton className='w-full h-24' />
              ) : (
                formattedText
              )}
            </div>
          </div>
        )}
        {audioUrl && !loading && (
          <div className='icon set'>
            <div className="flex items-center gap-2"></div>
            <button onClick={toggleAudioPlay} className="ml-2">
              <FontAwesomeIcon
                icon={isPlaying ? faPauseCircle : faPlayCircle}
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
