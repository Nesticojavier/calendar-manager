import { api } from "./config/axiosConfig";

export const volunteerService = {
  getAllJobsateJob: async () => {
    const response = await api.request({
      url: "/volunteer/jobs",
      method: "GET",
    });
    return response.data;
  },
  postulate: async (workId) => {
    const response = await api.request({
      url: "/volunteer/postulation",
      data: {workId},
      method: "POST",
    });
    return response.data;
  },
  showProfile: async () => {
    const response = await api.request({
      url: "/volunteer/profile",
      method: "GET",
    });
    return response.data;
  },
};
