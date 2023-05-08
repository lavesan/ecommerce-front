import { useState, useEffect, useMemo } from "react";

import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";
import { IEnterprise } from "@/models/entities/IEnterprise";
import {
  getSavedCheckout,
  removeCheckoutEnterpriseStorage,
  removeCheckoutProductsStorage,
  saveCheckoutEnterpriseStorage,
  saveCheckoutProductsStorage,
  sumValues,
} from "@/helpers/checkout.helper";

export const useConfigCheckout = () => {
  const [checkoutEnterprise, setCheckoutEnterprise] =
    useState<IEnterprise | null>(null);
  const [checkoutProducts, setCheckoutProducts] = useState<ICheckoutProduct[]>(
    []
  );
  const [open, setOpen] = useState(false);

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

  const openCheckout = () => {
    setOpen(true);
  };

  const closeCheckout = () => {
    setOpen(false);
  };

  const freightTotal = useMemo(() => {
    return 0;
  }, []);

  const prodTotal = useMemo(() => {
    const productValues = checkoutProducts.map(
      (prod) => prod.value * prod.quantity
    );
    return sumValues(productValues);
  }, [checkoutProducts]);

  const total = useMemo(() => {
    return freightTotal + prodTotal;
  }, [freightTotal, prodTotal]);

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
    open,
    openCheckout,
    closeCheckout,
    total,
    prodTotal,
    freightTotal,
  };
};
