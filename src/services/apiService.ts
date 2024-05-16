import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchResponse = async (input: string) => {
  try {
    if (!input) {
      throw new Error("Input text is empty");
    }
    const response = await apiClient.post('/api/v1/agents/text_to_speech_pipeline/', { text: input });
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error("API request error:", error.response ? error.response.data : error.message);
    throw error;
  }
};
export default apiClient;
