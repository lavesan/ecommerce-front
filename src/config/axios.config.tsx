import { getStorageToken } from "@/helpers/auth.helper";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const successReqInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = getStorageToken();

  const headers = config.headers || {};

  headers.Authorization = headers.Authorization
    ? headers.Authorization
    : `Bearer ${token}`;
  config.headers = headers;

  return config;
};

const errReqInterceptor = (error: AxiosError) => {
  return Promise.reject(error);
};

const successResInterceptor = (response: AxiosResponse) => {
  return response;
};

const errResInterceptor = (error: any) => {
  return Promise.reject(error);
};

// Add a request interceptor
server.interceptors.request.use(successReqInterceptor, errReqInterceptor);
// Add a response interceptor
server.interceptors.response.use(successResInterceptor, errResInterceptor);
