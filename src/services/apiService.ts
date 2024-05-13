import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchResponse = async (input: string) => {
  const response = await apiClient.post('/api/v1/agents/text_to_speech_pipeline/', { text: input });
  // console.log(response.data)
  return response.data;
};

export default apiClient;
