import { useState } from "react";

import { IClient } from "@/models/entities/IClient";
import { IEnterprise } from "@/models/entities/IEnterprise";

export const useConfigApp = () => {
  const [enterprises, setEnterprises] = useState<IEnterprise[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<null | IClient>(null);

  const setEnterpriseMenu = (enterprise: IEnterprise) => {
    setEnterprises((actual) =>
      actual.map((storedEnterprise) =>
        enterprise.id === storedEnterprise.id ? enterprise : storedEnterprise
      )
    );
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
  };
};
