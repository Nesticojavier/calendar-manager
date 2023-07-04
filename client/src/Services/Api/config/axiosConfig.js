import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization : `Bearer ${token}`
  },
});

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  const statusCode = error.response?.status;

//   logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    throw error
  }

  return Promise.reject(error);
};

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error);
});
