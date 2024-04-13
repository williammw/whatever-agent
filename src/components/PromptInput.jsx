import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
  faMicrophone,
  faTurnUp,
} from "@fortawesome/free-solid-svg-icons";

import { useMessages } from "../context/MessagesContext";


const PromptInput = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const { addMessage } = useMessages();

  // useEffect(() => {
  //   if (audioUrl) {
  //     const audio = new Audio(audioUrl);
  //     audio
  //       .play()
  //       .catch((error) => console.error("Error playing the audio:", error));
  //   }
  // }, [audioUrl]); // This will trigger every time audioUrl change


  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const handleAudioPlay = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio
      .play()
      .catch((error) => console.error("Error playing the audio:", error));
  };

  const handleSubmit = async (e) => {
    console.log('submit')
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/agents/text_to_speech_pipeline/",
        {
          text: input,
        }
      );
      addMessage({
        username: "User",
        text: input,
        sender: "user",
        avatar: "https://i.pravatar.cc/300",
      });
      addMessage({
        username: "iBuu",
        text: response.data.text,
        sender: "bot",
        avatar: "https://i.pravatar.cc/300",
        audioUrl: response.data.audio,
      });
      // ...other state updates

      setResponseText(response.data.text);
      setAudioUrl(response.data.audio);
      setLoading(false);
    } catch (error) {
      console.error("There was an error!", error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-4 rounded-lg">
      <div className="flex items-center text-white">
        <FontAwesomeIcon icon={faPaperclip} className="mr-3" />

        <textarea
          placeholder="Enter a prompt here"
          className="flex-grow bg-gray-900 rounded-md p-2 text-white"
          value={input}
          onChange={handleInputChange}
        />

        <FontAwesomeIcon icon={faMicrophone} className="ml-3" />

        <button type="submit">
          <FontAwesomeIcon icon={faTurnUp} className="ml-3" />
        </button>
      </div>
      {/* {loading && <p>Loading...</p>}
      {responseText && <p>{responseText}</p>}
      {audioUrl && <audio controls src={audioUrl} />} */}
    </form>
  );
};

export default PromptInput;
