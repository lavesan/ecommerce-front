import {
  clearCredentials,
  getCredentialsToken,
  setCredentialsToken,
} from "@/helpers/auth.helper";
import Router from "next/router";

import { RefreshTokenService } from "@/services/refreshToken.service";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect } from "react";

let isRefreshing = false;
let failedRequestsQueue: {
  onSuccess: (token: string) => void;
  onError: (err: AxiosError) => void;
}[] = [];

export const server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const refreshTokenService = RefreshTokenService.getInstance();

const successReqInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = getCredentialsToken();

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

const errResInterceptor = (error: AxiosError) => {
  const credentials = getCredentialsToken();
  if (!credentials) return Promise.reject(error);

  if (
    error.response?.status === 401 &&
    // @ts-ignore
    error.response?.data?.message === "Token inválido."
  ) {
    if (isRefreshing) {
      const originalConfig = error.config;

      return new Promise((resolve, reject) => {
        failedRequestsQueue.push({
          onSuccess: (token: string) => {
            if (!originalConfig) return;

            originalConfig.headers["Authorization"] = `Bearer ${token}`;

            resolve(server(originalConfig));
          },
          onError: (err: AxiosError) => {
            reject(err);
          },
        });
      });
    }

    isRefreshing = true;

    return refreshTokenService
      .refresh()
      .then((credentials) => {
        setCredentialsToken(credentials);

        server.defaults.headers[
          "Authorization"
        ] = `Bearer ${credentials.accessToken}`;

        failedRequestsQueue.forEach((request) =>
          request.onSuccess(credentials.accessToken)
        );
        failedRequestsQueue = [];

        // @ts-ignore
        error.config.headers[
          "Authorization"
        ] = `Bearer ${credentials.accessToken}`;

        // @ts-ignore
        return server(error.config);
        // if (error.config) return server(error.config);
      })
      .catch((err: any) => {
        failedRequestsQueue.forEach((request) =>
          request.onError(err as AxiosError)
        );
        failedRequestsQueue = [];
        clearCredentials();
        Router.push("/login");
        throw new Error(err);
      })
      .finally(() => {
        isRefreshing = false;
      });
  }

  return Promise.reject(error);
};

// Add a request interceptor
server.interceptors.request.use(successReqInterceptor, errReqInterceptor);
// Add a response interceptor
server.interceptors.response.use(successResInterceptor, errResInterceptor);

// export const AxiosInterceptorHOC = ({ children }: React.PropsWithChildren) => {
//   const { setToken, logout } = useAuthContext();

//   useEffect(() => {
//     const successResInterceptor = (response: AxiosResponse) => {
//       return response;
//     };

//     const errResInterceptor = (error: any) => {
//       const erMsg = error?.response?.data?.message || "Aconteceu um problema";
//       showToast({ title: erMsg, status: "error" });
//       return Promise.reject(error);
//     };

//     // Add a request interceptor
//     const reqInterceptor = server.interceptors.request.use(
//       successReqInterceptor,
//       errReqInterceptor
//     );
//     // Add a response interceptor
//     const resInterceptor = server.interceptors.response.use(
//       successResInterceptor,
//       errResInterceptor
//     );

//     // return () => {
//     //   server.interceptors.request.eject(reqInterceptor);
//     //   server.interceptors.response.eject(resInterceptor);
//     // };
//   }, [setIsLoading]);

//   return children;
// };
