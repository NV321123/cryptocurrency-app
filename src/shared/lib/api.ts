import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (response) => {
    if (response.data && response.data.Response === "Error") {
      console.log('api');

      return Promise.reject(new Error(response.data.Message || "API Error"));
    }
    console.log(response);
    return response;
  },
  (error) => {
    if (error.response && error.response.data && error.response.data.Message) {
      return Promise.reject(new Error(error.response.data.Message));
    }
    return Promise.reject(error);
  }
);