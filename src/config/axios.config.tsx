import { getStorageToken } from "@/helpers/auth.helper";
import { useAppContext } from "@/hooks/useAppContext";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useEffect } from "react";

export const server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

interface IAxiosInterceptorHOCProps {
  children: React.ReactElement;
}

export const AxiosInterceptorHOC = ({
  children,
}: IAxiosInterceptorHOCProps) => {
  const { setIsLoading } = useAppContext();

  useEffect(() => {
    const successReqInterceptor = (config: InternalAxiosRequestConfig) => {
      setIsLoading(true);
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
    const reqInterceptor = server.interceptors.request.use(
      successReqInterceptor,
      errReqInterceptor
    );
    // Add a response interceptor
    const resInterceptor = server.interceptors.response.use(
      successResInterceptor,
      errResInterceptor
    );

    // return () => {
    //   server.interceptors.request.eject(reqInterceptor);
    //   server.interceptors.response.eject(resInterceptor);
    // };
  }, [setIsLoading]);

  return children;
};
