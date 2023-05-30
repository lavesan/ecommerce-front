import { useMemo } from "react";
import Link from "next/link";
import { Box, Button, Paper, Typography, Divider } from "@mui/material";

import { useResponsive } from "@/hooks/useResponsive";
import { maskMoney } from "@/helpers/money.helper";
import { getFullProductCheckoutValueFormat } from "@/helpers/checkout.helper";
import {
  maskDateTime,
  translateOrderStatus,
  translatePaymentType,
} from "@/helpers/mask.helper";
import { IUseFetchOrderData } from "@/hooks/fetch/useFetchOrder";

export const Inactive = ({
  productsValue,
  freightValue,
  created_at,
  paymentType,
  status,
  enterprise,
  address,
  products,
}: IUseFetchOrderData) => {
  const { isMobile } = useResponsive();

  const { prodFormat, freightFormat, totalFormat } = useMemo(() => {
    return {
      prodFormat: maskMoney(productsValue),
      freightFormat: maskMoney(freightValue),
      totalFormat: maskMoney(productsValue + freightValue),
    };
  }, [freightValue, productsValue]);

  const deliveryAddress = useMemo(() => {
    if (!address) return "";

    return `${address.street} - ${address.city} - ${address.state} - ${address.district}, ${address.number} - ${address.complement}`;
  }, [address]);

  return (
    <Box px={[2, 0]}>
      <Paper
        elevation={4}
        sx={{
          p: 2,
          width: isMobile ? "100%" : "50%",
          mx: "auto",
        }}
      >
        <Typography variant="h1">{enterprise?.name}</Typography>
        <Link href={`/loja/${enterprise?.id}`}>
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
        <Typography variant="body1">{enterprise?.estimatedTime}</Typography>
        <Divider sx={{ my: 2 }} />
        {products.map((product, index) => (
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
            <Typography>
              {getFullProductCheckoutValueFormat(product)}
            </Typography>
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
            {prodFormat}
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
            {freightFormat}
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
            {totalFormat}
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
        <Typography>{maskDateTime(created_at)}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography>{translatePaymentType[paymentType]}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h3" color="grey.500">
          Status do pedido
        </Typography>
        <Typography>{translateOrderStatus[status]}</Typography>
      </Paper>
    </Box>
  );
};
