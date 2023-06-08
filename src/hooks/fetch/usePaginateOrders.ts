import { useInfiniteQuery } from "@tanstack/react-query";

import { OrderService } from "@/services/order.service";
import { useAppContext } from "../useAppContext";

interface IUsePaginateOrdersParams {
  isActive: boolean;
  userId: string;
  enabled: boolean;
}

export const usePaginateOrders = ({
  isActive,
  userId,
  enabled,
}: IUsePaginateOrdersParams) => {
  const orderService = OrderService.getInstance();

  const { setIsLoading } = useAppContext();

  const fetchOrders = ({ pageParam = 0 }) => {
    return orderService.paginateMine({
      size: 10,
      page: pageParam,
      isActive,
    });
  };

  return useInfiniteQuery({
    queryKey: ["orders", isActive, userId],
    queryFn: fetchOrders,
    getNextPageParam: (lastPage, pages) =>
      lastPage.size * (lastPage.page + 1) < lastPage.count,
    onSettled() {
      setIsLoading(false);
    },
    refetchInterval: 1 * 60000,
    enabled,
  });
};
