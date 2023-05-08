import React from "react";

import { IEnterprise } from "@/models/entities/IEnterprise";
import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";

export const CheckoutContext = React.createContext({
  enterprise: {} as IEnterprise | null,
  setEnterprise: (enterprise: IEnterprise) => {},
  products: [] as ICheckoutProduct[],
  removeProduct: (id: string) => {},
  updateProduct: (product: ICheckoutProduct) => {},
  addProduct: (enterprise: IEnterprise, product: ICheckoutProduct) => {},
  clearCheckout: () => {},
  open: false,
  openCheckout: () => {},
  closeCheckout: () => {},
  prodTotal: 0,
  freightTotal: 0,
  total: 0,
  hasProducts: false,
  productsCount: 0,
});
