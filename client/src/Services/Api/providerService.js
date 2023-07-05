import { api } from "./config/axiosConfig";

export const providerService = {
  createJob: async (data) => {
      const response = await api.request({
        url: "/provider/create",
        data,
        method: "POST",
      });
      return response.data;
  },
  getJobs: async () => {
      const response = await api.request({
        url: "/provider/myJobs",
        method: "GET",
      });
      return response.data;
  },
  deleteJob: async (workId) => {
      const response = await api.request({
        url: `/provider/job/${workId}`,
        method: "DELETE",
      });
      return response.data;
  },
};
