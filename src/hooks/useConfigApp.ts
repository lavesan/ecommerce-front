import { IEnterprise } from "@/models/entities/IEnterprise";
import { useState } from "react";

export const useConfigApp = () => {
  const [enterprises, setEnterprises] = useState<IEnterprise[]>([]);

  const setEnterpriseMenu = (enterprise: IEnterprise) => {
    setEnterprises((actual) =>
      actual.map((storedEnterprise) =>
        enterprise.id === storedEnterprise.id ? enterprise : storedEnterprise
      )
    );
  };

  return {
    enterprises,
    setEnterprises,
    setEnterpriseMenu,
  };
};
