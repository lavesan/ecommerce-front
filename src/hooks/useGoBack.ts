import {
  clearGoBackUrl,
  getGoBackUrl,
  saveGoBackUrl,
} from "@/helpers/navigate.helper";
import { useRouter } from "next/router";

export const useGoBack = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const goStoreBackOrBack = () => {
    const savedGoBackUrl = getGoBackUrl();
    if (savedGoBackUrl) {
      router.push(savedGoBackUrl);
      return clearGoBackUrl();
    }

    goBack();
  };

  const storeGoBackUrl = (url: string) => {
    saveGoBackUrl(url);
  };

  return { goBack, goStoreBackOrBack, storeGoBackUrl };
};
