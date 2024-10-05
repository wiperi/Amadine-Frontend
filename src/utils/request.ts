import axios from 'axios';
import { getToken } from './token';

const request = axios.create({
  baseURL: 'http://127.0.0.1:3200',
  timeout: 5000,
});

// Request interceptor
// A middleware before send request
request.interceptors.request.use((config) => {
  // Add token to query params for GET requests, or to request body for other methods
  const token = getToken();
  if (config.method === 'get') {
    config.params = { ...config.params, token };
  } else {
    config.data = { ...config.data, token };
  }
  return config;
}, error => {
  return Promise.reject(error);
})

// Response interceptor
// A middleware after receive response
request.interceptors.response.use((response) => {
  return response;
}, error => {
  return Promise.reject(error);
})

export default request;
