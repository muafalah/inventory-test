import { config } from "@/lib/config";

const inventoryEndpoint = (path: string) =>
  `${config.API_BASE_URL}/inventories${path}`;

export const inventoryService = {
  keys: {
    list: ["inventory", "list"] as const,
    detailById: ["inventory", "detail"] as const,
    deleteById: ["inventory", "delete"] as const,
    createUpdate: ["inventory", "createUpdate"] as const,
  },
  endpoints: {
    list: inventoryEndpoint("/"),
    detailById: (id: string) => inventoryEndpoint(`/${id}`),
    deleteById: (id: string) => inventoryEndpoint(`/${id}`),
    createUpdate: (id: string) => inventoryEndpoint(`/${id}`),
  },
};
