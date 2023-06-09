import { useQuery } from "@tanstack/react-query";

import { WeekDay } from "@/enums/WeekDay.enum";
import { PromotionService } from "@/services/promotion.service";

interface IUseFindAllPromotionsQuery {
  enterpriseId?: string;
  weekDay: WeekDay;
}

export const useFindAllPromotionsQuery = (
  filter: IUseFindAllPromotionsQuery
) => {
  const promotionService = PromotionService.getInstance();

  return useQuery({
    queryKey: ["promotions", filter],
    queryFn: () => promotionService.findAll(filter),
    refetchInterval: 10 * 60000,
  });
};
