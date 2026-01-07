import axios from "axios";

import config from "@/config";
import { getOneTimeToken } from "@/lib";
import { getLanguageFromAsyncStorage } from "@/lib/storage";

export const futuresApi = axios.create({
  baseURL: config.futuresApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

futuresApi.interceptors.request.use(
  async (config) => {
    // Add language to request headers
    const language = await getLanguageFromAsyncStorage();
    if (language) {
      config.headers["X-Language"] = language.code;
    }

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

futuresApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      JSON.stringify({
        data: error.response?.data,
        code: error.response?.status,
        url: error.config?.url,
        method: error.config?.method,
        api: "futures-api",
      })
    );
    return Promise.reject(error);
  }
);

export default futuresApi;
