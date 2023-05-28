import { IPromotion } from "@/models/entities/IPromotion";
import { IPromotionProduct } from "@/models/entities/IPromotionProduct";

type GetProdPromotionReturn = {
  product: IPromotionProduct;
  promotion: IPromotion;
} | null;

export const getProdPromotion = (
  id: string,
  promotions: IPromotion[]
): GetProdPromotionReturn => {
  let promoProd: GetProdPromotionReturn = null;

  promotions.forEach((promo) => {
    const foundPromoProd = promo.promotionProducts?.find(
      (promoProd) => promoProd.product?.id === id
    );

    if (foundPromoProd) {
      promoProd = {
        product: foundPromoProd,
        promotion: promo,
      };
      return;
    }
  });

  return promoProd;
};
