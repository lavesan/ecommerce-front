import { useQuery } from "@tanstack/react-query";

import { OrderService } from "@/services/order.service";
import { useAppContext } from "../useAppContext";
import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";
import { orderProdToCheckoutProd } from "@/helpers/orderProdToCheckoutProd.helper";
import { PromotionService } from "@/services/promotion.service";
import { getWeekDay } from "@/helpers/date.helper";
import { IOrder } from "@/models/entities/IOrder";

interface IUseFetchOrderParams {
  orderId: string;
}

export interface IUseFetchOrderData extends IOrder {
  products: ICheckoutProduct[];
}

export const useFetchOrder = ({ orderId }: IUseFetchOrderParams) => {
  const orderService = OrderService.getInstance();
  const promotionService = PromotionService.getInstance();

  const { setIsLoading } = useAppContext();

  const todayWeekDay = getWeekDay();

  const fetchOrders = async (param: any): Promise<IUseFetchOrderData> => {
    const order = await orderService.findById(orderId);
    const promotions = await promotionService.findAll({
      weekDay: todayWeekDay,
    });

    const checkoutProducts: ICheckoutProduct[] = orderProdToCheckoutProd(
      order.orderProducts || [],
      promotions
    );

    return {
      ...order,
      products: checkoutProducts || [],
    };
  };

  return useQuery({
    queryKey: ["order", orderId],
    queryFn: fetchOrders,
    onSettled() {
      setIsLoading(false);
    },
  });
};
