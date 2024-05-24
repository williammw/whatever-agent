import React, { useState, useEffect, useRef } from "react";
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // console.log('audioUrl', audioUrl)
  const toggleAudioPlay = () => {
    if (audioUrl && audioRef.current) {
      if (!isPlaying) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((error) => console.error("Error playing the audio:", error));
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', () => setIsPlaying(false));
      }
    };
  }, [audioUrl]);

  const formattedText = text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line.replace('```','<code>')}
      <br />
    </React.Fragment>
  ));
  
  return (
    <div className="w-full text-token-text-primary">
      <div className="flex flex-col mx-auto gap-3 md:gap-4 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] pb-0">
        {role === "user" ? (
          <div className="flex items-center justify-end">
            <div className="bg-gray-100 text-[16px] leading-[24px] p-3 rounded-lg break-words max-w-[80%] mt-2 message-text">
              {loading ? (
                <Skeleton className="w-full h-24" />
              ) : (
                formattedText
              )}
            </div>
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
            <div className="bg-gray-100 text-[16px] leading-[24px] p-3 rounded-lg break-words max-w-[80%] mt-2 message-text">
              {formattedText}
            </div>
          </div>
        )}
        {audioUrl && !loading && (
          <div className="flex items-center gap-2 mt-2">
            <button onClick={toggleAudioPlay} className="ml-2">
              <FontAwesomeIcon
                icon={isPlaying ? faPauseCircle : faPlayCircle}
                className="cursor-pointer w-6 h-6"
              />
            </button>
            <button className="ml-2">
              <FontAwesomeIcon
                icon={faCopy}
                className="cursor-pointer w-4 h-4 fa-fw"
              />
            </button>
            <button className="ml-2">
              <FontAwesomeIcon
                icon={faThumbsDown}
                className="cursor-pointer w-4 h-4 fa-fw"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
