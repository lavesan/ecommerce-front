import { useState, useEffect } from "react";

import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";
import { IEnterprise } from "@/models/entities/IEnterprise";
import {
  getSavedCheckout,
  removeCheckoutEnterpriseStorage,
  removeCheckoutProductsStorage,
  saveCheckoutEnterpriseStorage,
  saveCheckoutProductsStorage,
} from "@/helpers/checkout.helper";

export const useConfigCheckout = () => {
  const [checkoutEnterprise, setCheckoutEnterprise] =
    useState<IEnterprise | null>(null);
  const [checkoutProducts, setCheckoutProducts] = useState<ICheckoutProduct[]>(
    []
  );

  const clearCheckout = () => {
    setCheckoutEnterprise(null);
    setCheckoutProducts([]);
    removeCheckoutEnterpriseStorage();
    removeCheckoutProductsStorage();
  };

  const setCheckoutEnterpriseFunc = (enterprise: IEnterprise) => {
    saveCheckoutEnterpriseStorage(enterprise);
    setCheckoutEnterprise(enterprise);
  };

  const addCheckoutProduct = (product: ICheckoutProduct) => {
    setCheckoutProducts((actual) => {
      const hasProduct = actual.some(({ id }) => product.id === id);
      if (!hasProduct) actual.push(product);
      else
        actual = actual.map((storedProduct) =>
          storedProduct.id === product.id
            ? {
                ...storedProduct,
                quantity: storedProduct.quantity + 1,
              }
            : storedProduct
        );

      saveCheckoutProductsStorage(actual);

      return actual;
    });
  };

  const removeCheckoutProduct = (id: string) => {
    setCheckoutProducts((actual) => {
      const filtered = actual.filter(({ id: storedId }) => storedId !== id);
      saveCheckoutProductsStorage(filtered);
      return filtered;
    });
  };

  useEffect(() => {
    const storedCheckout = getSavedCheckout();
    if (storedCheckout) {
      setCheckoutEnterprise(storedCheckout.enterprise);
      setCheckoutProducts(storedCheckout.products);
    }
  }, []);

  return {
    enterprise: checkoutEnterprise,
    products: checkoutProducts,
    clearCheckout,
    addProduct: addCheckoutProduct,
    removeProduct: removeCheckoutProduct,
    setEnterprise: setCheckoutEnterpriseFunc,
  };
};
