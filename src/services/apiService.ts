import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchResponseStream = (input: string) => {
  return new EventSourcePolyfill(`http://localhost:8000/api/v1/agents/text_to_speech_pipeline_stream/?text=${encodeURIComponent(input)}`);
};

export default apiClient;


