import axios from 'axios';
import { tokenService } from './auth/tokenService';

const token = tokenService.get({ context: null });

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { Authorization: `Bearer ${token}` }
});

export default api;

api.interceptors.request.use(async (request) => {
  return request;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(`error`, error);
  }
);
