import axios from "axios";

import type { AxiosResponse } from "axios";

export const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
export const BASE_URL = "https://api.giphy.com/v1/gifs/";

export async function buildAxiosRequest<ResponseType, DataType>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  data?: DataType,
): Promise<AxiosResponse<ResponseType>> {
  let response: AxiosResponse<ResponseType>;
  switch (method) {
    case "GET":
      response = await axios.get<ResponseType>(url);
      break;
    case "POST":
      response = await axios.post<ResponseType>(url, data);
      break;
    case "PUT":
      response = await axios.put<ResponseType>(url, data);
      break;
    case "DELETE":
      response = await axios.delete<ResponseType>(url);
      break;
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
  return response;
}
