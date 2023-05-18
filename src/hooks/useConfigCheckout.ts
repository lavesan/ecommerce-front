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
import { IAddress } from "@/models/entities/IAddress";
import { useConfigApp } from "./useConfigApp";
import { maskMoney } from "@/helpers/money.helper";

export const useConfigCheckout = (
  appConfig: Partial<ReturnType<typeof useConfigApp>>
) => {
  const [checkoutEnterprise, setCheckoutEnterprise] =
    useState<IEnterprise | null>(null);
  const [checkoutProducts, setCheckoutProducts] = useState<ICheckoutProduct[]>(
    []
  );
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState<IAddress | null>(null);

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

    newProducts.push(product);

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

  const getProdTotalValue = (product: ICheckoutProduct) => {
    const additionalsValue = product.additionals.reduce(
      (value, additional) => value + additional.value * additional.quantity,
      0
    );
    const productValue =
      (product.promotionId ? product.promotionValue : product.value) ||
      product.value;

    const totalSum = (productValue + additionalsValue) * product.quantity;

    return {
      value: totalSum,
      formatted: maskMoney(totalSum),
    };
  };

  const freightTotal = useMemo<number>(() => {
    const freight = checkoutEnterprise?.freights?.find(
      ({ addressValue }) => addressValue === address?.district
    );

    return freight?.value || 0;
  }, [checkoutEnterprise, address]);

  const prodTotal = useMemo<number>(() => {
    const productValues = checkoutProducts.map(
      (prod) => getProdTotalValue(prod).value
    );
    return sumValues(productValues);
  }, [checkoutProducts]);

  const total = useMemo<number>(() => {
    return freightTotal + prodTotal;
  }, [freightTotal, prodTotal]);

  useEffect(() => {
    const storedCheckout = getSavedCheckout();

    if (storedCheckout) {
      if (storedCheckout.products.length)
        setCheckoutEnterprise(storedCheckout.enterprise);
      else clearEnterprise();
      setCheckoutProducts(storedCheckout.products);
    }
  }, []);

  useEffect(() => {
    const addresses = appConfig.addresses;

    if (addresses?.length) {
      const selectedAddr =
        addresses?.find(({ isDefault }) => isDefault) || addresses[0];

      if (selectedAddr) setAddress(selectedAddr);
    }
  }, [appConfig.addresses]);

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
    address,
    setAddress,
    getProdTotalValue,
  };
};
