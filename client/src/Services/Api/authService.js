import { api } from "./config/axiosConfig";

export const authService = {
  signup: async (data) => {
    const response = await api.request({
      url: `/signup`,
      data,
      method: "POST",
    });
    return response.data;
  },
  login: async (data) => {
    const response = await api.request({
      url: `/login`,
      data,
      method: "POST",
    });
    return response.data;
  },
  dashboard: async () => {
    const response = await api.request({
      url: "/dashboard",
      method: "GET"
    });
    return response.data;
  },
};
