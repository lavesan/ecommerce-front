import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";
import { IOrderProduct } from "@/models/entities/IOrderProduct";
import { IPromotion } from "@/models/entities/IPromotion";
import { maskMoney } from "./money.helper";
import { IProduct } from "@/models/entities/IProduct";
import { getProdPromotion } from "./getProdPromotion.helper";

export const orderProdToCheckoutProd = (
  products: IOrderProduct[],
  promotions: IPromotion[]
): ICheckoutProduct[] => {
  return products.map((prod, index) => {
    const prodPromotion = getProdPromotion(prod.product?.id || "", promotions);

    return {
      key: Date.now() + index,
      quantity: prod.quantity,
      valueFormat: maskMoney(prod.product?.value),
      promotionId: prodPromotion?.promotion.id,
      promotionValue: prodPromotion?.product.value,
      promotionValueFormat: maskMoney(prodPromotion?.product.value),
      additionals:
        prod.additionals?.map((additional) => ({
          addCategoryId:
            additional.productAdditional?.productAdditionalCategory?.id || "",
          name: additional.productAdditional?.name || "",
          id: additional.productAdditional?.id || "",
          value: additional.productAdditional?.value || 0,
          quantity: additional.quantity,
        })) || [],
      ...(prod.product || ({} as IProduct)),
    };
  });
};
