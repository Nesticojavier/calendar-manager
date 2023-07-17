import { api } from "./config/axiosConfig";

export const volunteerService = {
  getAllJobsateJob: async () => {
    const response = await api.request({
      url: "/volunteer/jobs",
      method: "GET",
    });
    return response.data;
  },
  postulate: async (workId, selectedDates) => {
    const response = await api.request({
      url: "/volunteer/postulation",
      data: { workId, selectedDates },
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
  editProfile: async (data) => {
    const response = await api.request({
      url: "/volunteer/profile",
      method: "PUT",
      data,
    });
    return response.data;
  },
  jobsInProgress: async (start, limit, confirmed) => {
    /**
     * @PARAM
     * - start: number of row in the database for start display
     * - limit: number of rows to display
     * - confirmed: boolean value indicating whether the
     *   postulation should be confirmed
     */
    const response = await api.request({
      url: "/volunteer/jobs-in-progress",
      method: "GET",
      params: {
        start,
        limit,
        confirmed,
      },
    });
    return response.data;
  },
  cancelPostulation: async (workId) => {
    const response =  await api.request({
      url: "/volunteer/postulation",
      method: "DELETE",
      data: {workId}
    })
  },
  leavePostulation: async (workId) => {
    const response =  await api.request({
      url: `/volunteer/postulation-leave/${workId}`,
      method: "DELETE",
    })
    return response.data
  },

};
