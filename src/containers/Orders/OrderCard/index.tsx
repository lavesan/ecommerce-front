import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Card, Box, Avatar, Typography, Divider, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { IOrder } from "@/models/entities/IOrder";
import { getImgUrl } from "@/helpers/image.helper";
import { OrderStatus } from "@/enums/OrderStatus.enum";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";
import { IPromotion } from "@/models/entities/IPromotion";
import { orderProdToCheckoutProd } from "@/helpers/orderProdToCheckoutProd.helper";

interface IOrderCardProps {
  order: IOrder;
  isLast: boolean;
  isActive?: boolean;
  hasNextPage: boolean;
  promotions?: IPromotion[];
  fetchNextPage: VoidFunction;
}

const translateOrderStatus = {
  [OrderStatus.DONE]: "Pedido concluído",
  [OrderStatus.SENDING]: "Pedido enviado",
  [OrderStatus.CANCELED]: "Pedido cancelado",
  [OrderStatus.DOING]: "Pedido em preparo",
  [OrderStatus.TO_APPROVE]: "A ser aprovado",
  [OrderStatus.DELETED]: "Pedido deletado",
};

export const OrderCard = ({
  order,
  isLast,
  isActive,
  promotions,
  hasNextPage,
  fetchNextPage,
}: IOrderCardProps) => {
  const { setCart, setAddress, openCheckout } = useCheckoutContext();

  const cardRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const goToOrder = () => {
    router.push(`/pedido/${order.id}`);
  };

  const saveToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (order.enterprise && order.orderProducts && promotions) {
      const checkoutProducts: ICheckoutProduct[] = orderProdToCheckoutProd(
        order.orderProducts,
        promotions
      );

      setCart(order.enterprise, checkoutProducts);
      if (order.address) setAddress(order.address);
      openCheckout();
    }
  };

  useEffect(() => {
    if (!hasNextPage || !cardRef?.current || !fetchNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (hasNextPage && isLast && entry.isIntersecting) {
        fetchNextPage();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast, hasNextPage, fetchNextPage]);

  return (
    <Card
      ref={cardRef}
      sx={{ p: 4, cursor: "pointer", userSelect: "none", mb: 1 }}
      onClick={goToOrder}
      elevation={4}
    >
      <Box
        component="header"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="row">
          <Avatar
            alt={`logo_${order.enterprise?.name}`}
            src={getImgUrl(order.enterprise?.imageKey || "")}
          />
          <Box display="flex" flexDirection="column" ml={1}>
            <Typography component="h3">{order.enterprise?.name}</Typography>
            <Typography component="p">
              {translateOrderStatus[order.status]}
            </Typography>
          </Box>
        </Box>
        <ArrowForwardIosIcon />
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box flexDirection="column">
        <Typography component="p">
          {order.orderProducts?.map(
            (prod) => `${prod.quantity}x ${prod.product?.name}`
          )}
        </Typography>
      </Box>

      {!isActive && (
        <>
          <Divider sx={{ my: 2 }} />

          <Box flexDirection="row">
            <Button
              fullWidth
              type="button"
              variant="outlined"
              onClick={saveToCart}
            >
              Adicionar no carrinho
            </Button>
          </Box>
        </>
      )}
    </Card>
  );
};
