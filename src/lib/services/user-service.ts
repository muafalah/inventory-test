import { config } from "@/lib/config";

const userEndpoint = (path: string) => `${config.API_BASE_URL}/users${path}`;

export const userService = {
  keys: {
    list: ["user", "list"] as const,
    detailById: ["user", "detail"] as const,
    deleteById: ["user", "delete"] as const,
    createUpdate: ["user", "createUpdate"] as const,
  },
  endpoints: {
    list: userEndpoint("/"),
    detailById: (id: string) => userEndpoint(`/${id}`),
    deleteById: (id: string) => userEndpoint(`/${id}`),
    createUpdate: (id: string) =>
      id ? userEndpoint(`/${id}/change-info`) : userEndpoint("/"),
  },
};
