import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useEffect, useMemo } from 'react';

const useApiClient = () => {
  const { getToken } = useAuth();
  const apiBaseUrl = import.meta.env.VITE_APP_APIURL;

  // Memoize apiClient to avoid recreating on every render
  const apiClient = useMemo(() => {
    const client = axios.create({
      baseURL: `${apiBaseUrl}/api/v1/cdn`, // Your FastAPI backend URL
    });

    client.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    return client;
  }, [apiBaseUrl, getToken]);

  return apiClient;
};

export default useApiClient;