import { api } from "./config/axiosConfig";

export const reportsService = {
  getReportProvider: async () => {
    const response = await api.request({
      url: "/report/provider",
      method: "GET",
      responseType: "blob",
    });
    return response.data;
  },
  getProviderTrackingReport: async ({user_id, startDate, endDate, format}) => {
    const response = await api.request({
      url: `/report/provider-tracking/${user_id}`,
      method: "GET",
      params: {
        startDate,
        endDate,
        format,
      },
    });
  },
  getProviderPostulationsReport: async ({user_id, startDate, endDate, format}) => {
    const response = await api.request({
      url: `/report/provider-postulations/${user_id}`,
      method: "GET",
      params: {
        startDate,
        endDate,
        format,
      },
    });
  },
};
