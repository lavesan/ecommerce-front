import { useQuery } from "@tanstack/react-query";

import { getWeekDay } from "@/helpers/date.helper";
import { PromotionService } from "@/services/promotion.service";
import { useAppContext } from "../useAppContext";
import { IPromotion } from "@/models/entities/IPromotion";

export const useTodayPromotionsQuery = () => {
  const promotionService = PromotionService.getInstance();

  const { setIsLoading } = useAppContext();

  const todayWeekDay = getWeekDay();

  return useQuery<IPromotion[]>({
    queryKey: ["promotion", todayWeekDay],
    queryFn: () => promotionService.findAll({ weekDay: todayWeekDay }),
    onSettled() {
      setIsLoading(false);
    },
    refetchInterval: 10 * 60000,
  });
};
