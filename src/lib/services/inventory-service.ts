import { config } from "@/lib/config";

const inventoryEndpoint = (path: string) =>
  `${config.API_BASE_URL}/inventories${path}`;

export const inventoryService = {
  keys: {
    list: ["inventory", "list"] as const,
    create: ["inventory", "create"] as const,
    detailById: ["inventory", "detail"] as const,
    updateById: ["inventory", "update"] as const,
  },
  endpoints: {
    list: inventoryEndpoint("/"),
    create: inventoryEndpoint("/"),
    detailById: (id: string) => inventoryEndpoint(`/${id}`),
    updateById: (id: string) => inventoryEndpoint(`/${id}`),
  },
};
