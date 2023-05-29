import {
  CHECKOUT_ENTERPRISE_KEY,
  CHECKOUT_PRODUCTS_KEY,
} from "@/constants/checkout.storage";
import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";
import { IEnterprise } from "@/models/entities/IEnterprise";
import { maskMoney } from "./money.helper";

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
  return arr.reduce((elem1, elem2) => elem1 + elem2, 0);
};

export const exchangeIsEnough = (
  exchange: { value: number; quantity: string }[],
  total: number
): boolean => {
  const totalExchangeValue = exchange.reduce(
    (sumValue, { value, quantity }) =>
      sumValue + value * (Number.isNaN(quantity) ? 1 : Number(quantity)),
    0
  );

  return totalExchangeValue >= total;
};

export const getProductValue = (product: ICheckoutProduct): number => {
  return product.promotionValue ? product.promotionValue : product.value;
};

export const getProductValueFormat = (product: ICheckoutProduct): string => {
  return product.promotionValueFormat
    ? product.promotionValueFormat
    : product.valueFormat;
};

export const getFullProductCheckoutValue = (
  product: ICheckoutProduct
): number => {
  const additionalsValue = product.additionals.reduce(
    (value, additional) => value + additional.quantity * additional.value,
    0
  );
  const prodValue = product.promotionId
    ? product.promotionValue || 0
    : product.value;

  return (additionalsValue + prodValue) * product.quantity;
};

export const getFullProductCheckoutValueFormat = (
  product: ICheckoutProduct
): string => {
  const fullValue = getFullProductCheckoutValue(product);

  return maskMoney(fullValue);
};
