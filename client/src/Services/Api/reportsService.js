import { api } from "./config/axiosConfig";

export const reportsService = {
  getReportProvider: async () => {
    const response = await api.request({
      url: "/report/provider",
      method: "GET",
      responseType: "arraybuffer",
    });
    return response.data;
  },
  getProviderTrackingReport: async ({
    user_id,
    startDate,
    endDate,
    format,
    admin,
  }) => {
    const response = await api.request({
      url: `/report/${admin ? "admin" : "provider"}-tracking/${user_id}`,
      method: "GET",
      responseType: format === "pdf" ? "blob" : "arraybuffer",
      params: {
        startDate,
        endDate,
        format,
      },
    });
    return response.data;
  },
  getProviderPostulationsReport: async ({
    user_id,
    startDate,
    endDate,
    format,
    admin,
  }) => {
    const response = await api.request({
      url: `/report/${admin ? "admin" : "provider"}-postulations/${user_id}`,
      method: "GET",
      responseType: format === "pdf" ? "blob" : "arraybuffer",
      params: {
        startDate,
        endDate,
        format,
      },
    });
    return response.data;
  },
  getVolunteerTrackingReport: async ({
    startDate,
    endDate,
    format,
  }) => {
    const response = await api.request({
      url: `/report/volunteer-tracking`,
      method: "GET",
      responseType: format === "pdf" ? "blob" : "arraybuffer",
      params: {
        startDate,
        endDate,
        format,
      },
    });
    return response.data;
  },
};
