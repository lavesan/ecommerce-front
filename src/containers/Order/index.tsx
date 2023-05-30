import { useMemo } from "react";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";

import { useFetchOrder } from "@/hooks/fetch/useFetchOrder";
import { OrderStatus } from "@/enums/OrderStatus.enum";
import { useResponsive } from "@/hooks/useResponsive";
import { Active } from "./Active";
import { Inactive } from "./Inactive";
import { BouncingDotsLoader } from "@/components/BouncingDotsLoader";

const Order = () => {
  const { query } = useRouter();

  const { isMobile } = useResponsive();

  const { data: order, isFetching } = useFetchOrder({
    orderId: query.orderId as string,
  });

  const isActive = useMemo(() => {
    const activeStatus: string[] = [
      OrderStatus.TO_APPROVE,
      OrderStatus.DOING,
      OrderStatus.SENDING,
    ];

    return activeStatus.includes(order?.status || "");
  }, [order]);

  if (!order && isFetching) return <BouncingDotsLoader isLoading />;

  if (!order)
    return (
      <>
        <Typography variant="h1">Nenhum pedido foi encontrado</Typography>
      </>
    );

  return <>{isActive ? <Active {...order} /> : <Inactive {...order} />}</>;
};

export default Order;
