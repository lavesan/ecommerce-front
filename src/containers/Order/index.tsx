import { useMemo } from "react";
import { useRouter } from "next/router";
import { Typography, Button, Box, Divider, Paper } from "@mui/material";
import Link from "next/link";

import { useFetchOrder } from "@/hooks/fetch/useFetchOrder";
import { getFullProductCheckoutValueFormat } from "@/helpers/checkout.helper";
import { maskMoney } from "@/helpers/money.helper";
import { maskDateTime } from "@/helpers/mask.helper";
import { PaymentType } from "@/enums/PaymentType.enum";
import { OrderStatus } from "@/enums/OrderStatus.enum";
import { useResponsive } from "@/hooks/useResponsive";

const translatePaymentType = {
  [PaymentType.CREDIT_CARD_MACHINE]: "Pago na maquininha de cartão de crédito",
  [PaymentType.DEBIT_CARD_MACHINE]: "Pago na maquininha de cartão de débito",
  [PaymentType.MONEY]: "Pago em dinheiro",
};

const translateOrderStatus = {
  [OrderStatus.CANCELED]: "Cancelado",
  [OrderStatus.DELETED]: "Deletado",
  [OrderStatus.DOING]: "Fazendo",
  [OrderStatus.DONE]: "Feito",
  [OrderStatus.SENDING]: "Entregando",
  [OrderStatus.TO_APPROVE]: "A aprovar",
};

const Order = () => {
  const { query } = useRouter();

  const { isMobile } = useResponsive();

  const { data: order } = useFetchOrder({ orderId: query.orderId as string });

  const { prodValue, freightValue, totalValue } = useMemo(() => {
    return {
      prodValue: order ? maskMoney(order.productsValue) : "",
      freightValue: order ? maskMoney(order.freightValue) : "",
      totalValue: order
        ? maskMoney(order.productsValue + order.freightValue)
        : "",
    };
  }, [order]);

  const deliveryAddress = useMemo(() => {
    if (!order?.address) return "";

    const { address } = order;

    return `${address.street} - ${address.city} - ${address.state} - ${address.district}, ${address.number} - ${address.complement}`;
  }, [order]);

  return (
    <Paper
      elevation={4}
      sx={{ p: 2, mx: "auto", width: isMobile ? "100%" : "50%" }}
    >
      <Typography variant="h1">{order?.enterprise?.name}</Typography>
      <Link href={`/loja/${order?.enterprise?.id}`}>
        <Button
          variant="outlined"
          size="large"
          sx={{ my: 2, textTransform: "none" }}
        >
          Ver menu
        </Button>
      </Link>
      <Typography variant="h3" color="grey.500" mb={1}>
        Previsão de entrega
      </Typography>
      <Typography variant="body1">
        {order?.enterprise?.estimatedTime}
      </Typography>
      <Divider sx={{ my: 2 }} />
      {order?.products.map((product, index) => (
        <Box
          key={product.id}
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          mt={!!index ? 1 : 0}
        >
          <Typography>
            {product.quantity}x {product.name}
          </Typography>
          <Typography>{getFullProductCheckoutValueFormat(product)}</Typography>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        mb={1}
      >
        <Typography variant="h3" component="p">
          Subtotal
        </Typography>
        <Typography variant="h3" component="p">
          {prodValue}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        mb={1}
      >
        <Typography variant="h3" color="grey.500" component="p">
          Entrega
        </Typography>
        <Typography variant="h3" color="grey.500" component="p">
          {freightValue}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        mb={1}
      >
        <Typography variant="h3" component="p">
          Total
        </Typography>
        <Typography variant="h3" component="p">
          {totalValue}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h3" color="grey.500">
        Endereço de entrega
      </Typography>
      <Typography>{deliveryAddress}</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h3" color="grey.500">
        Data do pedido
      </Typography>
      <Typography>{maskDateTime(order?.created_at)}</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography>
        {!!order && translatePaymentType[order.paymentType]}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h3" color="grey.500">
        Status do pedido
      </Typography>
      <Typography>{!!order && translateOrderStatus[order.status]}</Typography>
    </Paper>
  );
};

export default Order;
