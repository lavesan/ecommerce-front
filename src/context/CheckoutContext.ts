import React from "react";

import { IEnterprise } from "@/models/entities/IEnterprise";
import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";

export const CheckoutContext = React.createContext({
  enterprise: {} as IEnterprise | null,
  setEnterprise: (enterprise: IEnterprise) => {},
  products: [] as ICheckoutProduct[],
  removeProduct: (id: string) => {},
  addProduct: (product: ICheckoutProduct) => {},
  clearCheckout: () => {},
  open: false,
  openCheckout: () => {},
  closeCheckout: () => {},
});
