import React from "react";

import { IEnterprise } from "@/models/entities/IEnterprise";
import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";
import { IAddress } from "@/models/entities/IAddress";
import { IFreight } from "@/models/entities/IFreight";

export const CheckoutContext = React.createContext({
  enterprise: {} as IEnterprise | null,
  freight: {} as IFreight | null,
  setEnterprise: (enterprise: IEnterprise) => {},
  products: [] as ICheckoutProduct[],
  removeProduct: (key: number | null) => {},
  address: {} as IAddress | null,
  setAddress: (address: IAddress) => {},
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
  getProdTotalValue: (product: ICheckoutProduct) => ({
    value: 0,
    formatted: "",
  }),
});
