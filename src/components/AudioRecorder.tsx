import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from '@nextui-org/react';

const AudioRecorder: React.FC = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string>('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const apiBaseUrl = import.meta.env.VITE_APP_APIURL;

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();

    const audioChunks: Blob[] = [];
    mediaRecorder.addEventListener('dataavailable', event => {
      audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener('stop', () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      setAudioBlob(audioBlob);
    });

    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const sendAudioToBackend = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append('audio_file', audioBlob, 'recording.wav');

    try {
      const response = await axios.post(`${apiBaseUrl}/api/v1/agents/upload-audio`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { transcript, audioUrl } = response.data;
      setTranscription(transcript);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  return (
    <div className="p-4">
      <Button onClick={recording ? stopRecording : startRecording} className="m-2">
        {recording ? 'Stop Recording' : 'Start Recording'}
      </Button>
      <Button onClick={sendAudioToBackend} disabled={!audioBlob} className="m-2">
        Send to Backend
      </Button>
      {transcription && (
        <div className="mt-4">
          <h3>Transcription:</h3>
          <p>{transcription}</p>
        </div>
      )}
      {audioUrl && (
        <div className="mt-4">
          <h3>Audio:</h3>
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
