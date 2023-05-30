import { useEffect, useMemo, useState } from "react";
import { Typography, Box, Paper, Link, Button, Collapse } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import { LinearProgressOrder } from "@/components/LinearProgressOrder";
import { addDigits, translatePaymentType } from "@/helpers/mask.helper";
import { IUseFetchOrderData } from "@/hooks/fetch/useFetchOrder";
import { OrderStatus } from "@/enums/OrderStatus.enum";
import { maskMoney } from "@/helpers/money.helper";
import { OrderService } from "@/services/order.service";

type ConcludeIconType = "Ok" | "Cancel";

const ConcludedIcon = ({ icon }: { icon: ConcludeIconType }) => {
  if (icon === "Cancel")
    return <CancelOutlinedIcon fontSize="large" color="error" />;

  return <CheckCircleOutlineOutlinedIcon fontSize="large" color="success" />;
};

export const Active = ({
  id,
  enterprise,
  status,
  created_at,
  address,
  freightValue,
  productsValue,
  paymentType,
}: IUseFetchOrderData) => {
  const orderService = OrderService.getInstance();

  const [inactiveStatus, setInactiveStatus] = useState(false);

  const formattedEstimatedTime = useMemo(() => {
    if (!enterprise?.estimatedTime) return "";
    const { estimatedTime } = enterprise;

    const [hours, minutes] = estimatedTime.split(":");

    const createdDate = new Date(created_at);

    createdDate.setHours(createdDate.getHours() + Number(hours));
    createdDate.setMinutes(createdDate.getMinutes() + Number(minutes));

    return `${addDigits(createdDate.getHours())}:${addDigits(
      createdDate.getMinutes()
    )}h`;
  }, [enterprise, created_at]);

  const { totalFormat } = useMemo(() => {
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

  const formattedStatus = useMemo(() => {
    const handleStatus = {
      [OrderStatus.TO_APPROVE]:
        "O pedido está esperando aprovação do restaurante",
      [OrderStatus.DOING]: "O pedido está sendo preparado",
      [OrderStatus.SENDING]: "O pedido está sendo enviado",
      [OrderStatus.DONE]: "Pedido entregue",
    };

    // @ts-ignore
    return handleStatus[status] || "";
  }, [status]);

  const whatsappLink = useMemo(
    () => `https://wa.me/${enterprise?.phone}`,
    [enterprise]
  );

  const onConfirmClick = async () => {
    await orderService.conclude({ orderId: id });
    setInactiveStatus(true);
  };

  const concludedText = useMemo<{
    label: string;
    icon: ConcludeIconType;
  }>(() => {
    if (status == OrderStatus.CANCELED)
      return { label: "Pedido cancelado", icon: "Cancel" };
    else if (status == OrderStatus.DELETED)
      return { label: "Pedido excluído", icon: "Cancel" };
    else if (status == OrderStatus.DONE)
      return { label: "Pedido concluído", icon: "Ok" };
    return { label: "Pedido concluído", icon: "Ok" };
  }, [status]);

  useEffect(() => {
    const activeStatuses = [
      OrderStatus.TO_APPROVE,
      OrderStatus.DOING,
      OrderStatus.SENDING,
    ];

    if (!activeStatuses.includes(status)) {
      setInactiveStatus(true);
    }
  }, [status]);

  return (
    <>
      <Box px={2}>
        <Typography variant="h3" color="grey.500">
          Previsão de entrega
        </Typography>
        <Typography component="p" fontSize={32} mb={2}>
          Hoje, {formattedEstimatedTime}
        </Typography>
        <Collapse in={!inactiveStatus}>
          <LinearProgressOrder status={status} mb={2} />
          <Typography mb={2}>{formattedStatus}</Typography>
        </Collapse>
      </Box>
      <Box p={4} flex={1} sx={{ backgroundColor: "grey.100" }}>
        <Collapse in={inactiveStatus}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              mb: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <ConcludedIcon icon={concludedText.icon} />
            <Typography>{concludedText.label}</Typography>
          </Paper>
        </Collapse>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h3" mb={1}>
            Endereço de entrega
          </Typography>
          <Typography>{deliveryAddress}</Typography>
          {!inactiveStatus && status == OrderStatus.SENDING && (
            <Button
              fullWidth
              type="button"
              variant="contained"
              onClick={onConfirmClick}
              size="large"
              sx={{ mt: 2, textTransform: "none" }}
            >
              Confirmar entrega
            </Button>
          )}
        </Paper>
        <Paper elevation={2} sx={{ mt: 2, p: 2 }}>
          <Typography variant="h3" mb={1}>
            Detalhe do pedido
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography>Tipo de pagamento</Typography>
            <Typography textAlign="end">
              {translatePaymentType[paymentType]}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Total</Typography>
            <Typography>{totalFormat}</Typography>
          </Box>
          {!inactiveStatus && (
            <Link
              href={whatsappLink}
              target="_blank"
              underline="none"
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={2}
              color="green"
            >
              <WhatsAppIcon sx={{ mr: 1 }} /> Falar pelo whatsapp
            </Link>
          )}
        </Paper>
      </Box>
    </>
  );
};
