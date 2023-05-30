import { useState } from "react";
import { PaletteMode } from "@mui/material";

import { IEnterprise } from "@/models/entities/IEnterprise";
import { IToastParams } from "@/models/context/IToastParams";
import { IToastState } from "@/models/context/IToastState";

export const useConfigApp = () => {
  const [enterprises, setEnterprises] = useState<IEnterprise[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [themeMode, setThemeMode] = useState<PaletteMode>("light");
  const [toast, setToast] = useState<IToastState>({
    isOpen: false,
  } as IToastState);
  const [showAddressModal, setShowAddressModal] = useState(false);

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

  const toogleAddressModal = () => {
    setShowAddressModal((actual) => !actual);
  };

  return {
    enterprises,
    setEnterprises,
    setEnterpriseMenu,
    isLoading,
    setIsLoading,
    themeMode,
    isDarkMode: themeMode === "dark",
    toogleThemeMode,
    toast,
    showToast,
    onToastClose,
    showAddressModal,
    toogleAddressModal,
  };
};
