import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';

const apiBaseUrl = import.meta.env.VITE_APP_APIURL;
const whoami = import.meta.env.VITE_APP_WHOAMI;
console.log('whoami:', whoami);
console.log('apiBaseUrl:', apiBaseUrl);

const apiClient = axios.create({
  baseURL: `${apiBaseUrl}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchResponseStream = (input: string) => {
  console.log('Creating EventSource for:', `${apiBaseUrl}/api/v1/agents/text_to_speech_pipeline_stream/?text=${encodeURIComponent(input)}`);
  return new EventSourcePolyfill(`${apiBaseUrl}/api/v1/agents/text_to_speech_pipeline_stream/?text=${encodeURIComponent(input)}`);
};

export default apiClient;
