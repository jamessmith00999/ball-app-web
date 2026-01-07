import axios from "axios";

import { getOneTimeToken } from "@/lib/auth-client";
import { getLanguageFromAsyncStorage } from "@/lib/storage";
import config from "@/config";

const sportsApi = axios.create({
  baseURL: config.sportsApiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to attach one-time token
sportsApi.interceptors.request.use(
  async (config) => {
    if (!config.url?.includes("/public")) {
      // Add language to request headers
      const language = await getLanguageFromAsyncStorage();
      if (language) {
        config.headers["X-Language"] = language.code;
      }
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

sportsApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      JSON.stringify({
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
        api: "sports-api",
      })
    );
    return Promise.reject(error);
  }
);

export default sportsApi;
