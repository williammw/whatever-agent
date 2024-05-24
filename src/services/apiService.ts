import axios from 'axios';
import { getAuth } from 'firebase/auth';

const apiBaseUrl = import.meta.env.VITE_APP_APIURL;

const apiClient = axios.create({
  baseURL: `${apiBaseUrl}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchResponseStream = async (input: string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  let token = '';
  if (user) {
    token = await user.getIdToken();
  }

  const response = await apiClient.post(`${apiBaseUrl}/api/v1/agents/generate_stream_url/`, { text: input, token });
  const { stream_url } = response.data;

  return new EventSource(`${apiBaseUrl}${stream_url}?text=${encodeURIComponent(input)}&token=${token}`);
};

export const sendAudioFile = async (audioBlob: Blob) => {
  const formData = new FormData();
  formData.append('audio_file', audioBlob, 'recording.wav');
  
  const response = await apiClient.post('/api/v1/agents/upload-audio', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export default apiClient;
