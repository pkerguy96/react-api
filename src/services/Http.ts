import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

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
    axiosInstance.get<T>(this.endpoint).then((res) => res.data);
  };
  Postall = (data: T) => {
    axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };
}

export default axiosInstance;
