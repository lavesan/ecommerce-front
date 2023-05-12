import { GO_BACK_URL } from "@/constants/navigate.storage";

export const saveGoBackUrl = (url: string) => {
  sessionStorage.setItem(GO_BACK_URL, url);
};

export const getGoBackUrl = () => {
  return sessionStorage.getItem(GO_BACK_URL);
};

export const clearGoBackUrl = () => {
  sessionStorage.removeItem(GO_BACK_URL);
};
