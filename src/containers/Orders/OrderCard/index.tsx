import React, { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/router";
import {
  Card,
  Box,
  Avatar,
  Typography,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { IOrder } from "@/models/entities/IOrder";
import { getImgUrl } from "@/helpers/image.helper";
import { OrderStatus } from "@/enums/OrderStatus.enum";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { ICheckoutProduct } from "@/models/checkout/ICheckoutProduct";
import { IPromotion } from "@/models/entities/IPromotion";
import { orderProdToCheckoutProd } from "@/helpers/orderProdToCheckoutProd.helper";
import { useAppContext } from "@/hooks/useAppContext";
import { LinearProgressOrder } from "@/components/LinearProgressOrder";
import { useEnterpriseMenuQuery } from "@/hooks/fetch/useEnterpriseMenuQuery";

interface IOrderCardProps {
  order: IOrder;
  isLast: boolean;
  isActive?: boolean;
  hasNextPage: boolean;
  promotions?: IPromotion[];
  fetchNextPage: VoidFunction;
}

type ChipColor =
  | "primary"
  | "error"
  | "warning"
  | "default"
  | "secondary"
  | "info"
  | "success";

const translateOrderStatus = {
  [OrderStatus.DONE]: {
    label: "Pedido concluído",
    color: "primary" as ChipColor,
  },
  [OrderStatus.SENDING]: {
    label: "Pedido enviado",
    color: "primary" as ChipColor,
  },
  [OrderStatus.CANCELED]: {
    label: "Pedido cancelado",
    color: "error" as ChipColor,
  },
  [OrderStatus.DOING]: {
    label: "Pedido em preparo",
    color: "primary" as ChipColor,
  },
  [OrderStatus.TO_APPROVE]: {
    label: "A ser aprovado",
    color: "warning" as ChipColor,
  },
  [OrderStatus.DELETED]: {
    label: "Pedido deletado",
    color: "error" as ChipColor,
  },
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

  const { result: menu } = useEnterpriseMenuQuery(order.enterprise?.id || "");

  const { isDarkMode, showToast } = useAppContext();

  const cardRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const goToOrder = () => {
    router.push(`/pedido/${order.id}`);
  };

  const saveToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!menu)
      return showToast({
        status: "error",
        message:
          "Aconteceu um erro ao adicionar ao carrinho. Recarregue a página por favor.",
      });

    if (order.enterprise && order.orderProducts && promotions) {
      const onlyExistingProducts = order.orderProducts.filter((orderProd) => {
        return menu.categories?.some((cat) =>
          cat.products?.some((prod) => prod.id === orderProd.product?.id)
        );
      });

      const checkoutProducts: ICheckoutProduct[] = orderProdToCheckoutProd(
        onlyExistingProducts,
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
      sx={{
        p: 4,
        cursor: "pointer",
        userSelect: "none",
        my: 1,
        transition: "background-color 0.3s",
        ":hover": {
          backgroundColor: isDarkMode ? "grey.900" : "grey.100",
        },
      }}
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
            <Chip
              label={translateOrderStatus[order.status].label}
              color={translateOrderStatus[order.status].color}
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>
        <ArrowForwardIosIcon />
      </Box>

      {isActive ? (
        <LinearProgressOrder status={order.status} my={2} />
      ) : (
        <Divider sx={{ my: 2 }} />
      )}

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
