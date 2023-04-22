import { IEnterprise } from "@/models/entities/IEnterprise";
import React from "react";

export const AppContext = React.createContext({
  enterprises: [] as IEnterprise[],
  setEnterpriseMenu: (enterprise: IEnterprise) => {},
  setEnterprises: (enterprises: IEnterprise[]) => {},
});
