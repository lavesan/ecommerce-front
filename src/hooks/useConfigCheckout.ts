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

  const hasProducts = useMemo(() => !!checkoutEnterprise, [checkoutEnterprise]);

  const productsCount = useMemo(() => {
    return checkoutProducts.length;
  }, [checkoutProducts]);

  const clearEnterprise = () => {
    setCheckoutEnterprise(null);
    removeCheckoutEnterpriseStorage();
  };

  const clearCheckout = () => {
    setCheckoutProducts([]);
    removeCheckoutProductsStorage();
    clearEnterprise();
  };

  const setCheckoutEnterpriseFunc = (enterprise: IEnterprise) => {
    saveCheckoutEnterpriseStorage(enterprise);
    setCheckoutEnterprise(enterprise);
  };

  const addCheckoutProduct = (
    enterprise: IEnterprise,
    product: ICheckoutProduct
  ) => {
    if (checkoutEnterprise?.id !== enterprise.id) {
      saveCheckoutEnterpriseStorage(enterprise);
      setCheckoutEnterprise(enterprise);
      setCheckoutProducts([product]);
      openCheckout();
      return;
    }

    let newProducts = JSON.parse(
      JSON.stringify(checkoutProducts)
    ) as ICheckoutProduct[];

    const hasProduct = newProducts.some(({ id }) => product.id === id);
    if (!hasProduct) newProducts.push(product);
    else
      newProducts = newProducts.map((storedProduct) =>
        storedProduct.id === product.id
          ? {
              ...storedProduct,
              quantity: storedProduct.quantity + 1,
            }
          : storedProduct
      );

    saveCheckoutProductsStorage(newProducts);
    setCheckoutProducts(newProducts);
  };

  const removeCheckoutProduct = (id: string) => {
    setCheckoutProducts((actual) => {
      const filtered = actual.filter(({ id: storedId }) => storedId !== id);
      saveCheckoutProductsStorage(filtered);

      if (!filtered.length) clearEnterprise();
      return filtered;
    });
  };

  const updateCheckoutProduct = (product: ICheckoutProduct) => {
    setCheckoutProducts((actual) =>
      actual.map((prod) => (prod.id === product.id ? product : prod))
    );
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
    updateProduct: updateCheckoutProduct,
    setEnterprise: setCheckoutEnterpriseFunc,
    open,
    openCheckout,
    closeCheckout,
    total,
    prodTotal,
    freightTotal,
    hasProducts,
    productsCount,
  };
};
