import axios from "axios";

import { config } from "@/lib/config";
import { getCookie, removeCookie, setCookie } from "@/lib/utils";
import { authService } from "@/lib/services/auth-service";

export type TErrorResponse = {
  message: string;
  status: number;
  result: null;
};

const getAccessToken = () => getCookie("access_token");
const getRefreshToken = () => getCookie("refresh_token");

const setTokens = (accessToken: string, refreshToken: string) => {
  setCookie("access_token", accessToken);
  setCookie("refresh_token", refreshToken);
};

const clearTokens = () => {
  removeCookie("access_token");
  removeCookie("refresh_token");
};

export const apiClient = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        clearTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          authService.endpoints.refreshToken,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const newAccessToken = res.data.result.accessToken;
        const newRefreshToken = res.data.result.refreshToken;

        setTokens(newAccessToken, newRefreshToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        clearTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
