import React from "react";

import { IToastParams } from "@/models/context/IToastParams";
import { IEnterprise } from "@/models/entities/IEnterprise";

export const AppContext = React.createContext({
  enterprises: [] as IEnterprise[],
  setIsLoading: (isLoading: boolean) => {},
  setEnterpriseMenu: (enterprise: IEnterprise) => {},
  setEnterprises: (enterprises: IEnterprise[]) => {},
  themeMode: "light",
  isDarkMode: false,
  toogleThemeMode: () => {},
  showToast: (data: IToastParams) => {},
  showAddressModal: false,
  toogleAddressModal: () => {},
});
