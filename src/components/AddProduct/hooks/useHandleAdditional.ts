import { useState, useMemo, useCallback, useEffect } from "react";

import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";
import { IEnterpriseMenuProduct } from "@/models/pages/IEnterpriseMenuProps";
import { IAddProductAdditional } from "@/models/components/IAddProductAdditional";

export const useHandleAdditional = (
  product: IEnterpriseMenuProduct | null,
  filled: ICheckoutProduct | null
) => {
  const [selectedOptions, setSelectedOptions] = useState<
    IAddProductAdditional[]
  >([]);

  const addAdditional = (additional: IAddProductAdditional) => {
    setSelectedOptions((actual) => {
      const additionalExists = actual.find((elem) => elem.id === additional.id);

      // Adds one more additional on quantity
      if (additionalExists) {
        return actual.map((elem) => {
          if (elem.id === additional.id) {
            return {
              ...elem,
              quantity: elem.quantity + 1,
            };
          }

          return elem;
        });
      }

      return [...actual, additional];
    });
  };

  const subtractAdditional = (id: string) => {
    setSelectedOptions((actual) => {
      const additionalExists = actual.find((elem) => elem.id === id);

      if (additionalExists) {
        if (additionalExists.quantity === 1) {
          return actual.filter((elem) => elem.id !== id);
        }

        return actual.map((elem) => {
          if (elem.id === id) {
            return {
              ...elem,
              quantity: elem.quantity - 1,
            };
          }

          return elem;
        });
      }

      return actual;
    });
  };

  const addToCartIsDisabled = useMemo(() => {
    if (!product) return true;

    return product.productAdditionalCategory?.some(
      ({ id, isOptional, limit }) => {
        const additionalOptions = selectedOptions.filter(
          (opt) => opt.addCategoryId === id
        );
        const additionalCount: number = additionalOptions.reduce(
          (opt1, opt2) => opt1 + opt2.quantity,
          0
        );

        return !isOptional && additionalCount < limit;
      }
    );
  }, [product, selectedOptions]);

  const disabledAddAddditional = ({
    addCategoryId,
    limit,
  }: {
    addCategoryId: string;
    limit: number;
  }): boolean => {
    if (!limit) return false;

    const categoryOptions = selectedOptions.filter(
      (opt) => opt.addCategoryId === addCategoryId
    );
    const additionalCount: number = categoryOptions.reduce(
      (opt1, opt2) => opt1 + opt2.quantity,
      0
    );

    return additionalCount >= limit;
  };

  const getAdditionalQuantity = (id: string): number => {
    const additional = selectedOptions.find((opt) => opt.id === id);

    if (additional) return additional.quantity;

    return 0;
  };

  const getAdditionalCategoryQuantity = useCallback(
    (id: string): number => {
      const additionals = selectedOptions.filter(
        (opt) => opt.addCategoryId === id
      );
      return additionals.reduce((opt1, opt2) => opt1 + opt2.quantity, 0);
    },
    [selectedOptions]
  );

  useEffect(() => {
    if (product && filled?.additionals.length) {
      setSelectedOptions(filled.additionals);
    }
  }, [filled, product]);

  return {
    addAdditional,
    subtractAdditional,
    disabledAddAddditional,
    getAdditionalQuantity,
    getAdditionalCategoryQuantity,
    addToCartIsDisabled,
    selectedOptions,
  };
};
