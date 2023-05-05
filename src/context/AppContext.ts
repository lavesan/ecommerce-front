import React from "react";

import { ILoginUserParams } from "@/models/context/ILoginUserParams";
import { IToastParams } from "@/models/context/IToastParams";
import { IUserToken } from "@/models/context/IUserToken";
import { IClient } from "@/models/entities/IClient";
import { IEnterprise } from "@/models/entities/IEnterprise";

export const AppContext = React.createContext({
  enterprises: [] as IEnterprise[],
  user: null as IClient | null,
  token: null as IUserToken | null,
  login: (data: ILoginUserParams) => {},
  logout: () => {},
  setToken: (token: string) => {},
  setUser: (user: IClient | null) => {},
  setIsLoading: (isLoading: boolean) => {},
  setEnterpriseMenu: (enterprise: IEnterprise) => {},
  setEnterprises: (enterprises: IEnterprise[]) => {},
  themeMode: "light",
  isDarkMode: false,
  toogleThemeMode: () => {},
  showToast: (data: IToastParams) => {},
});
