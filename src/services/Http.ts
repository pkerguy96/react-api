import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
interface ApiResponse<T> {
  data: T[];
}
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const user = localStorage.getItem("user_login");
    if (user) {
      config.headers["Authorization"] = `Bearer ${JSON.parse(user).token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export class APIClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getall = () => {
    return axiosInstance
      .get<ApiResponse<T>>(this.endpoint)
      .then((res) => res.data.data);
  };
  getone = () => {
    return axiosInstance.get<T>(this.endpoint).then((res) => res);
  };
  getById = (id: number) => {
    const endpointWithId = `${this.endpoint}/${id}`;
    return axiosInstance
      .get<ApiResponse<T>>(endpointWithId)
      .then((res) => res.data.data);
  };
  getUrl = (id: string) => {
    const endpointWithId = `${this.endpoint}/${id}`;

    return axiosInstance
      .get<ApiResponse<T>>(endpointWithId)
      .then((res) => res.data.data);
  };
  Postall = (data: T, options: any) => {
    return axiosInstance
      .post<T>(this.endpoint, data, options)
      .then((res) => res.data);
  };
  UpdateAll = (data: T, id: number) => {
    return axiosInstance
      .patch<T>(`${this.endpoint}/${id}`, data)
      .then((res) => res.data);
  };
  DeleteOne = (id: Number) => {
    return axiosInstance
      .delete<T>(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };
}

export default axiosInstance;
