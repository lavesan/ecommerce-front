import { useState } from "react";
import { PaletteMode } from "@mui/material";

import { IClient } from "@/models/entities/IClient";
import { IEnterprise } from "@/models/entities/IEnterprise";

export const useConfigApp = () => {
  const [enterprises, setEnterprises] = useState<IEnterprise[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<null | IClient>(null);
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

  const logout = () => {};

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
  };
};
