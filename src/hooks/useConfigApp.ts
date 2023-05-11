import { useCallback, useEffect, useState } from "react";
import { PaletteMode } from "@mui/material";
import { googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import { IClient } from "@/models/entities/IClient";
import { IEnterprise } from "@/models/entities/IEnterprise";
import {
  clearToken,
  getStorageToken,
  setStorageToken,
} from "@/helpers/auth.helper";
import { ClientService } from "@/services/client.service";
import { ILoginUserParams } from "@/models/context/ILoginUserParams";
import { IUserToken } from "@/models/context/IUserToken";
import { IToastParams } from "@/models/context/IToastParams";
import { IToastState } from "@/models/context/IToastState";
import { IAddress } from "@/models/entities/IAddress";

export const useConfigApp = () => {
  const clientService = ClientService.getInstance();

  const [enterprises, setEnterprises] = useState<IEnterprise[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<null | IClient>(null);
  const [token, setToken] = useState<null | IUserToken>(null);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");
  const [toast, setToast] = useState<IToastState>({
    isOpen: false,
  } as IToastState);

  const setEnterpriseMenu = (enterprise: IEnterprise) => {
    setEnterprises((actual) =>
      actual.map((storedEnterprise) =>
        enterprise.id === storedEnterprise.id ? enterprise : storedEnterprise
      )
    );
  };

  const toogleThemeMode = () => {
    setThemeMode((actual) => (actual === "light" ? "dark" : "light"));
  };

  const showToast = ({ message, status }: IToastParams) => {
    setToast({
      status,
      message,
      isOpen: true,
    });
  };

  const onToastClose = () => {
    setToast({
      message: "",
      status: "info",
      isOpen: false,
    });
  };

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

      setUser(client);
      setAddresses(client.addresses || []);
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
    enterprises,
    setEnterprises,
    setEnterpriseMenu,
    isLoading,
    setIsLoading,
    user,
    setUser,
    logout,
    themeMode,
    isDarkMode: themeMode === "dark",
    toogleThemeMode,
    token,
    setToken: modifyToken,
    login,
    toast,
    showToast,
    onToastClose,
    addresses,
    setAddresses,
    getMe,
  };
};
