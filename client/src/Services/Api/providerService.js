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
  editJob: async (data, jobId) => {
    const response = await api.request({
      url: `/provider/job/${jobId}`,
      data,
      method: "PUT",
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
  deleteJob: async (jobId) => {
    const response = await api.request({
      url: `/provider/job/${jobId}`,
      method: "DELETE",
    });
    return response.data;
  },
  getPostulations: async (start, limit, confirmed) => {
    /**
     * @PARAM
     * - start: number of row in the database for start display
     * - limit: number of rows to display
     * - confirmed: boolean value indicating whether the
     *   postulation should be confirmed
     */
    const response = await api.request({
      url: `/provider/jobs-in-progress`,
      method: "GET",
      params: {
        start,
        limit,
        confirmed,
      },
    });
    return response.data;
  },
  acceptPostulation: async (postulationID) => {
    const response = await api.request({
      url: `/provider/postulation/${postulationID}`,
      method: "PUT",
    });
    return response.data;
  },
  declinePostulation: async (postulationID) => {
    const response = await api.request({
      url: `/provider/postulation/${postulationID}`,
      method: "DELETE",
    });
    return response.data;
  },
  insertTrackingRecord: async (data, postulationID) => {
    const response = await api.request({
      url: `/provider/tracking/${postulationID}`,
      data,
      method: "POST",
    });
    return response.data;
  },
  postulationTracking: async (postulationID) => {
    const response = await api.request({
      url: `/provider/tracking/${postulationID}`,
      method: "GET",
    });
    return response.data;
  },
};
