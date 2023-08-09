import axios, { AxiosRequestConfig } from "axios";
export const api = axios.create({
  baseURL: "http://qa.forum-bulletin-board.dev.politetech.com/api/v1",
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  }
);

// Thêm một bộ đón chặn response
api.interceptors.response.use(
  function (response) {
    // Bất kì mã trạng thái nào nằm trong tầm 2xx đều khiến hàm này được trigger
    // Làm gì đó với dữ liệu response
    return response;
  },
  function (error) {
    // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
    // Làm gì đó với lỗi response
    return Promise.reject(error);
  }
);

export const getApiData = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
export const deleteApiData = async (endpoint: string) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
export const postApiData = async (endpoint: string) => {
  try {
    const response = await api.post(endpoint);
    const userToken = response.data.data.user.token;
    localStorage.setItem("token", userToken);
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
