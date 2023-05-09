import {
  CHECKOUT_ENTERPRISE_KEY,
  CHECKOUT_PRODUCTS_KEY,
} from "@/constants/checkout.storage";
import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";
import { IEnterprise } from "@/models/entities/IEnterprise";

export const getSavedCheckout = () => {
  const storedEnterprise = localStorage.getItem(CHECKOUT_ENTERPRISE_KEY);
  const storedProducts = localStorage.getItem(CHECKOUT_PRODUCTS_KEY);

  if (storedEnterprise && storedProducts) {
    return {
      enterprise: JSON.parse(storedEnterprise) as IEnterprise,
      products: JSON.parse(storedProducts) as ICheckoutProduct[],
    };
  }
  return null;
};

export const saveCheckoutEnterpriseStorage = (enterprise: IEnterprise) => {
  localStorage.setItem(CHECKOUT_ENTERPRISE_KEY, JSON.stringify(enterprise));
};

export const saveCheckoutProductsStorage = (products: ICheckoutProduct[]) => {
  localStorage.setItem(CHECKOUT_PRODUCTS_KEY, JSON.stringify(products));
};

export const removeCheckoutEnterpriseStorage = () => {
  localStorage.removeItem(CHECKOUT_ENTERPRISE_KEY);
};

export const removeCheckoutProductsStorage = () => {
  localStorage.removeItem(CHECKOUT_PRODUCTS_KEY);
};

export const sumValues = (arr: number[]): number => {
  return arr.length ? arr.reduce((elem1, elem2) => elem1 + elem2) : 0;
};
