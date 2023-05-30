import { useMemo } from "react";
import { BoxProps } from "@mui/material";

import { OrderStatus } from "@/enums/OrderStatus.enum";
import { LinearProgress } from "../LinearProgress";

interface ILinearProgressOrder extends BoxProps {
  status: OrderStatus;
}

export const LinearProgressOrder = ({
  status,
  ...boxProps
}: ILinearProgressOrder) => {
  const progressWidth = useMemo(() => {
    const handleOrderStatusProgress = {
      [OrderStatus.TO_APPROVE]: "30%",
      [OrderStatus.DOING]: "50%",
      [OrderStatus.SENDING]: "100%",
    };

    // @ts-ignore
    return handleOrderStatusProgress[status] || "10%";
  }, [status]);

  return <LinearProgress {...boxProps} progressWidth={progressWidth} />;
};
