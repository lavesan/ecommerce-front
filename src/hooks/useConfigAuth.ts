import { useCallback, useEffect, useMemo, useState } from "react";

import { IUserToken } from "@/models/context/IUserToken";
import { IClient } from "@/models/entities/IClient";
import {
  clearToken,
  getStorageToken,
  setStorageToken,
} from "@/helpers/auth.helper";
import { googleLogout } from "@react-oauth/google";
import { ClientService } from "@/services/client.service";
import { ILoginUserParams } from "@/models/context/ILoginUserParams";
import { useConfigApp } from "./useConfigApp";

export const useConfigAuth = ({
  setIsLoading,
}: Omit<
  ReturnType<typeof useConfigApp>,
  "isLoading" | "toast" | "onToastClose"
>) => {
  const clientService = ClientService.getInstance();

  const [user, setUser] = useState<null | IClient>(null);
  const [token, setToken] = useState<null | IUserToken>(null);

  const addresses = useMemo(() => {
    return user?.addresses || [];
  }, [user?.addresses]);

  const login = ({ client, credentials }: ILoginUserParams) => {
    setToken(credentials);
    setUser(client);
    setStorageToken(credentials.accessToken);
  };

  const logout = () => {
    // @ts-ignore
    if (window?.google?.accounts?.id?.revoke) {
      // @ts-ignore
      window.google.accounts.id.revoke(user?.email);
    }
    googleLogout();
    setUser(null);
    setToken(null);
    clearToken();
  };

  const modifyToken = (token: string) => {
    setStorageToken(token);
    setToken({ accessToken: token, refreshToken: "" });
  };

  const getMe = useCallback(async () => {
    try {
      const client = await clientService.findMe();

      setUser(JSON.parse(JSON.stringify(client)));
    } catch (err: any) {
      console.log("Deu pau no find me");
    } finally {
      setIsLoading(false);
    }
  }, [clientService]);

  const onInit = useCallback(async () => {
    const storageToken = getStorageToken();

    if (storageToken) {
      setToken({ accessToken: storageToken, refreshToken: "" });

      getMe();
    }
  }, [getMe]);

  useEffect(() => {
    onInit();
  }, [onInit]);

  return {
    user,
    setUser,
    logout,
    token,
    setToken: modifyToken,
    login,
    addresses,
    getMe,
  };
};
