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
};
