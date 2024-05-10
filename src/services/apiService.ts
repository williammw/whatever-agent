// src/services/apiService.ts

import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1/agents/text_to_speech_pipeline/';

export const fetchResponse = async (text: string) => {
  try {
    const response = await axios.post(API_URL, { text });
    return response.data;
  } catch (error) {
    console.error("There was an error!", error);
    throw error;
  }
};
