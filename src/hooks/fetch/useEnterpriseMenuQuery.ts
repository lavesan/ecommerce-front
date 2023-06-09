import { getWeekDay } from "@/helpers/date.helper";
import { EnterpriseService } from "@/services/enterprise.service";
import { useQuery } from "@tanstack/react-query";
import { EnterpriseMenuFormattedType } from "@/models/pages/IEnterpriseMenuProps";
import { maskMoney } from "@/helpers/money.helper";
import { IPromotionProduct } from "@/models/entities/IPromotionProduct";
import { IPromotion } from "@/models/entities/IPromotion";
import { useMemo } from "react";
import { useFindAllPromotionsQuery } from "./useFindAllPromotionsQuery";

interface IUseEnterpriseMenuQueryReturn {
  result: EnterpriseMenuFormattedType | null;
}

export const useEnterpriseMenuQuery = (
  enterpriseId: string
): IUseEnterpriseMenuQueryReturn => {
  const enterpriseService = EnterpriseService.getInstance();

  const todayWeekDay = getWeekDay();

  const { data: promotions } = useFindAllPromotionsQuery({
    weekDay: todayWeekDay,
  });

  const { data: menu } = useQuery({
    queryKey: ["menu", enterpriseId],
    queryFn: () => enterpriseService.findMenu(enterpriseId),
    refetchInterval: 10 * 60000,
  });

  const result = useMemo(() => {
    if (!menu) return null;

    const mappedMenu = {
      ...menu,
      categories:
        menu.categories?.map((category) => ({
          ...category,
          products:
            category.products?.map((product) => {
              let promoProduct: IPromotionProduct = {} as IPromotionProduct;
              let promotion: IPromotion = {} as IPromotion;

              promotions?.every(({ promotionProducts, ...promo }) => {
                return promotionProducts?.every((prodPromo) => {
                  if (prodPromo.product?.id === product.id) {
                    promoProduct = prodPromo;
                    promotion = promo;
                    return false;
                  }
                  return true;
                });
              });

              return {
                ...product,
                promotionId: promotion?.id || null,
                promotionValue: promoProduct?.value || null,
                promotionValueFormat: maskMoney(promoProduct?.value) || null,
                valueFormat: maskMoney(product.value),
              };
            }) || [],
        })) || [],
    };

    return mappedMenu;
  }, [menu, promotions]);

  return {
    result,
  };
};
