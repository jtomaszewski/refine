import axios, { type AxiosInstance } from "axios";
import type { DataProvider } from "@refinedev/core";

const axiosInstance = axios.create();

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance,
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async ({ resource, meta, pagination }) => {
    let url = `${apiUrl}/${resource}?per_page=${pagination?.pageSize || 10}`;

    if (meta?.cursor?.current) {
      url = `${url}&until=${meta.cursor.current}`;
    }

    const { data } = await httpClient.get(url);

    const lastItem = data[data.length - 1];
    const nextCursor = lastItem?.commit?.committer?.date;

    return {
      data,
      total: 200,
      cursor: {
        next: nextCursor,
      },
    };
  },

  getMany: async () => {
    throw new Error("Not implemented");
  },

  create: async () => {
    throw new Error("Not implemented");
  },

  update: async () => {
    throw new Error("Not implemented");
  },

  getOne: async () => {
    throw new Error("Not implemented");
  },

  deleteOne: async () => {
    throw new Error("Not implemented");
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async () => {
    throw new Error("Not implemented");
  },
});
