// src/components/Message.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";

const Message = ({ text, sender, username, avatar, audioUrl }) => {
  const handleAudioPlay = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio
        .play()
        .catch((error) => console.error("Error playing the audio:", error));
    }
  };
  return (
    <div className="w-full text-token-text-primary">
      <div className="px-4 py-2 justify-center text-base md:gap-6 m-auto">
        <div className="flex flex-col mx-auto gap-3 md:gap-4 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
          <div className="flex items-center">
            <img
              src={avatar}
              alt={`${username}'s avatar`}
              className="w-8 h-8 rounded-full"
            />
            <span className="ml-2 text-sm font-semibold">{username}</span>
          </div>
          <div className="bg-gray-100 text-sm p-3 rounded-lg break-words w-full mt-2">
            {text}
            {audioUrl && (
              <FontAwesomeIcon
                icon={faPlayCircle}
                onClick={handleAudioPlay}
                className="ml-2 text-blue-500 cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
