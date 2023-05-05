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

export const useConfigApp = () => {
  const clientService = ClientService.getInstance();

  const [enterprises, setEnterprises] = useState<IEnterprise[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<null | IClient>(null);
  const [token, setToken] = useState<null | string>(null);
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");

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

  const logout = () => {
    googleLogout();
    setUser(null);
    setToken(null);
    clearToken();
  };

  const modifyToken = (token: string) => {
    setStorageToken(token);
    setToken(token);
  };

  const onInit = useCallback(async () => {
    const storageToken = getStorageToken();

    if (storageToken) {
      setToken(storageToken);
      const storageUser = jwt_decode<{ id: string }>(storageToken);

      if (storageUser) {
        const client = await clientService.findMe(storageUser.id);

        setUser(client);
      }
    }
  }, [clientService]);

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
  };
};
