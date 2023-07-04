import { api } from "./config/axiosConfig";

export const providerService = {
  getJobs: async () => {
      const response = await api.request({
        url: "/provider/myJobs",
        method: "GET",
      });
      return response.data;
  },
  test: async function (id, cancel = false) {
    const response = await api.request({
      url: `/products/:id`,
      method: "GET",
    });

    // returning the product returned by the API
    return response.data.product;
  },
};
