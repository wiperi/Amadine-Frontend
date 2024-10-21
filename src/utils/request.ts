import axios from 'axios';
import { getToken, removeToken } from './token';
import { router } from '@/router';

const request = axios.create({
  baseURL: 'http://localhost:3200',
  timeout: 5000,
});

// Request interceptor
// A middleware before send request
request.interceptors.request.use(
  (config) => {
    // Add token to query params for GET and DELETE requests, or to request body for other methods
    const token = getToken();
    if (token) {
      if (config.method === 'get' || config.method === 'delete') {
        config.params = { ...config.params, token };
      } else {
        config.data = { ...config.data, token };
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
// A middleware after receive response
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.dir(error);
    if (error.response.status === 401) {
      removeToken();
      router.navigate('/login');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default request;
