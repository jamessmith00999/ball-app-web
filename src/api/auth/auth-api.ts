import axios from "axios";

import config from "@/config";
import { getOneTimeToken } from "@/lib";

export const authApi = axios.create({
  baseURL: config.betterAuthUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

authApi.interceptors.request.use(
  async (config) => {
    if (!config.url?.includes("/public")) {
      // Add one-time token for authentication
      const token = await getOneTimeToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      JSON.stringify({
        data: error.response?.data,
        code: error.response?.status,
        url: error.config?.url,
        method: error.config?.method,
        api: "auth-api",
      })
    );
    return Promise.reject(error);
  }
);

export default authApi;
