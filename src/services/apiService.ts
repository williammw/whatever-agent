import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { getAuth } from 'firebase/auth';

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

  const es = new EventSourcePolyfill(`${apiBaseUrl}${stream_url}?text=${encodeURIComponent(input)}&token=${token}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return es;
};

export default apiClient;
