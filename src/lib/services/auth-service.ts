import { config } from "@/lib/config";

const authEndpoint = (path: string) => `${config.API_BASE_URL}/auth${path}`;

export const authService = {
  keys: {
    login: ["login"] as const,
  },
  endpoints: {
    login: authEndpoint("/login"),
  },
};
