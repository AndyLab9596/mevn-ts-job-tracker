import { useAuthStore } from '@/stores/authStore';
import type IError from '@/types/Error.type';
import axios, { type AxiosRequestHeaders } from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://mevn-ts-job-tracker.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const authStore = useAuthStore();
    (
      config.headers as AxiosRequestHeaders
    ).Authorization = `Bearer ${authStore.token}`;
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    const errorResponse: IError = error.response.data;
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(errorResponse);
  },
);

export default axiosClient;
