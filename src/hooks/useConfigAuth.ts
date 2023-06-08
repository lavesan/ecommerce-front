import { useCallback, useEffect, useMemo, useState } from "react";

import { ICredentialsToken } from "@/models/context/ICredentialsToken";
import { IClient } from "@/models/entities/IClient";
import {
  clearCredentials,
  getCredentialsToken,
  setCredentialsToken,
} from "@/helpers/auth.helper";
import { googleLogout } from "@react-oauth/google";
import { ClientService } from "@/services/client.service";
import { ILoginUserParams } from "@/models/context/ILoginUserParams";
import { RefreshTokenService } from "@/services/refreshToken.service";

export const useConfigAuth = () => {
  const clientService = ClientService.getInstance();
  const refreshTokenService = RefreshTokenService.getInstance();

  const [user, setUser] = useState<null | IClient>(null);
  const [token, setToken] = useState<null | ICredentialsToken>(null);

  const addresses = useMemo(() => {
    return user?.addresses || [];
  }, [user?.addresses]);

  const login = ({ client, credentials }: ILoginUserParams) => {
    setToken(credentials);
    setUser(client);
    setCredentialsToken(credentials);
  };

  const logout = () => {
    refreshTokenService.logout();
    // @ts-ignore
    if (window?.google?.accounts?.id?.revoke) {
      // @ts-ignore
      window.google.accounts.id.revoke(user?.email);
    }
    googleLogout();
    setUser(null);
    setToken(null);
    clearCredentials();
  };

  const modifyToken = (credentials: ICredentialsToken) => {
    setCredentialsToken(credentials);
    setToken(credentials);
  };

  const getMe = useCallback(async () => {
    try {
      const client = await clientService.findMe();

      const storageCredentials = getCredentialsToken();
      setToken(storageCredentials);
      setUser(JSON.parse(JSON.stringify(client)));
    } catch (err: any) {
      console.log("Deu pau no find me");
    }
  }, [clientService]);

  const onInit = useCallback(async () => {
    const storageCredentials = getCredentialsToken();

    if (storageCredentials) {
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
