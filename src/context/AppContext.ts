import { IClient } from "@/models/entities/IClient";
import { IEnterprise } from "@/models/entities/IEnterprise";
import React from "react";

export const AppContext = React.createContext({
  enterprises: [] as IEnterprise[],
  user: null as IClient | null,
  logout: () => {},
  setUser: (user: IClient | null) => {},
  setIsLoading: (isLoading: boolean) => {},
  setEnterpriseMenu: (enterprise: IEnterprise) => {},
  setEnterprises: (enterprises: IEnterprise[]) => {},
  themeMode: "light",
  isDarkMode: false,
  toogleThemeMode: () => {},
});
