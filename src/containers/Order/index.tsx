import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Typography, Box } from "@mui/material";

import { useFetchOrder } from "@/hooks/fetch/useFetchOrder";
import { Active } from "./Active";
import { Inactive } from "./Inactive";
import { BouncingDotsLoader } from "@/components/BouncingDotsLoader";
import { useAppContext } from "@/hooks/useAppContext";
import { isActiveOrder } from "@/constants/order.constants";

const Order = () => {
  const { query } = useRouter();

  const { setIsLoading } = useAppContext();

  const [firstLoad, setFirstLoad] = useState(true);
  const [isActive, setIsActive] = useState(true);

  const { data: order, isFetching } = useFetchOrder({
    orderId: query.orderId as string,
  });

  useEffect(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  useEffect(() => {
    if (!firstLoad) return;

    if (!order) return;
    else setFirstLoad(false);

    const updateIsActive = isActiveOrder(order.status);
    setIsActive(updateIsActive);
  }, [order, firstLoad]);

  if (!order && isFetching) return <BouncingDotsLoader isLoading />;

  if (!order)
    return (
      <>
        <Typography variant="h1">Nenhum pedido foi encontrado</Typography>
      </>
    );

  return (
    <Box pb={4}>
      {isActive ? <Active {...order} /> : <Inactive {...order} />}
    </Box>
  );
};

export default Order;
