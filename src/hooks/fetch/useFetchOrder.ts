import { useQuery } from "@tanstack/react-query";

import { OrderService } from "@/services/order.service";
import { useAppContext } from "../useAppContext";
import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";
import { orderProdToCheckoutProd } from "@/helpers/orderProdToCheckoutProd.helper";
import { getWeekDay } from "@/helpers/date.helper";
import { IOrder } from "@/models/entities/IOrder";
import { useMemo, useState } from "react";
import { isActiveOrder } from "@/constants/order.constants";
import { useFindAllPromotionsQuery } from "./useFindAllPromotionsQuery";

interface IUseFetchOrderParams {
  orderId: string;
}

export interface IUseFetchOrderData extends IOrder {
  products: ICheckoutProduct[];
}

export const useFetchOrder = ({ orderId }: IUseFetchOrderParams) => {
  const orderService = OrderService.getInstance();

  const { setIsLoading } = useAppContext();

  const [enabled, setEnabled] = useState(true);

  const todayWeekDay = getWeekDay();

  const { data: promotions, isFetching } = useFindAllPromotionsQuery({
    weekDay: todayWeekDay,
  });

  const { data: order } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const orderDb = await orderService.findById(orderId);

      const isActive = isActiveOrder(orderDb.status);

      if (!isActive) {
        setEnabled(false);
      }

      return orderDb;
    },
    onSettled() {
      setIsLoading(false);
    },
    refetchInterval: 1 * 60000,
    enabled,
  });

  const result = useMemo(() => {
    if (!promotions || !order) return null;

    const checkoutProducts: ICheckoutProduct[] = orderProdToCheckoutProd(
      order.orderProducts || [],
      promotions
    );

    return {
      ...order,
      products: checkoutProducts || [],
    };
  }, [promotions, order]);

  return {
    result,
    isFetching,
  };
};
