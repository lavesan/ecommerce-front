import { IEnterprise } from "@/models/entities/IEnterprise";
import React from "react";

export const AppContext = React.createContext({
  enterprises: [] as IEnterprise[],
  setIsLoading: (isLoading: boolean) => {},
  setEnterpriseMenu: (enterprise: IEnterprise) => {},
  setEnterprises: (enterprises: IEnterprise[]) => {},
});
