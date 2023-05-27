import { Box, Card } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useAppContext } from "@/hooks/useAppContext";
import { OrderService } from "@/services/order.service";

const usePaginateOrders = () => {
  const orderService = OrderService.getInstance();

  const { setIsLoading } = useAppContext();

  const fetchOrders = async ({ pageParam = 0 }) => {
    return orderService.paginateMine({ size: 10, page: pageParam });
  };

  return useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    getNextPageParam: (lastPage, pages) =>
      lastPage.size * lastPage.page < lastPage.count,
    onSettled() {
      setIsLoading(false);
    },
  });
};

const Orders = () => {
  const { data } = usePaginateOrders();

  return (
    <>
      {data?.pages.map((page, index) => (
        <Box
          key={`page_${index}`}
          display="flex"
          flexDirection={["column", "row"]}
          gap={2}
        >
          {page.data.map((order) => (
            <Card key={`order_${order.id}`}>Pedido: {order.id}</Card>
          ))}
        </Box>
      ))}
    </>
  );
};

export default Orders;
