import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

export const API_BASE_URL = 'https://agsdemo.in/vvs/api';

/**
 * Centralized axios instance — import this everywhere instead of
 * creating new axios instances or using fetch directly.
 *
 * Usage:
 *   import { apiClient } from '@/lib/apiClient';
 *   const { data } = await apiClient.post('/enquiry.php', payload);
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers.set('Content-Type', 'application/json');
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ?? error.message ?? 'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  },
);

export default apiClient;
