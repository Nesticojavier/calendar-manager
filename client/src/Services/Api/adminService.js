import { api } from "./config/axiosConfig";

export const adminService = {
  getUsers: async () => {
    const response = await api.request({
      url: `/admin/userslist`,
      method: "GET",
    });
    return response.data;
  },
};
