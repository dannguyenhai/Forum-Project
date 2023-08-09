import { BASE_URL } from "@/utils/constants";
import { api } from "./apiService";

export const uploadFile = async (params: File) => {
    const bodyFormData = new FormData();
    if (params) {
      bodyFormData.append("file", params);
    }

    const { data } = await api.post(`${BASE_URL}/assets`, bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  };