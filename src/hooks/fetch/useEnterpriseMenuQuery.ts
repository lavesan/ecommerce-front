import { getWeekDay } from "@/helpers/date.helper";
import { EnterpriseService } from "@/services/enterprise.service";
import { useQuery } from "@tanstack/react-query";
import { EnterpriseMenuFormattedType } from "@/models/pages/IEnterpriseMenuProps";
import { IEnterprise } from "@/models/entities/IEnterprise";
import { maskMoney } from "@/helpers/money.helper";
import { IPromotionProduct } from "@/models/entities/IPromotionProduct";
import { IPromotion } from "@/models/entities/IPromotion";

export const useEnterpriseMenuQuery = (enterpriseId: string) => {
  const enterpriseService = EnterpriseService.getInstance();

  const fetchMenu = async (): Promise<EnterpriseMenuFormattedType> => {
    const menu: IEnterprise = await enterpriseService.findMenu(enterpriseId);

    const todayWeekDay = getWeekDay();

    const todayPromotions = menu.promotions?.filter(
      ({ weekDay }) => weekDay === todayWeekDay
    );

    const mappedMenu = {
      ...menu,
      categories:
        menu.categories?.map((category) => ({
          ...category,
          products:
            category.products?.map((product) => {
              let promoProduct: IPromotionProduct = {} as IPromotionProduct;
              let promotion: IPromotion = {} as IPromotion;

              todayPromotions?.every(({ promotionProducts, ...promo }) => {
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
  };

  return useQuery({
    queryKey: ["menu", enterpriseId],
    queryFn: fetchMenu,
    refetchInterval: 10 * 60000,
  });
};
