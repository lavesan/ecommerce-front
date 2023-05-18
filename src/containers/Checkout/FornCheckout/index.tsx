import { Box, Typography, BoxProps } from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation";
import { Address } from "./Address";
import { useState } from "react";
import { PaymentType } from "@/enums/PaymentType.enum";
import { PaymentTypeRadio } from "./PaymentTypeRadio";

interface IForm {
  paymentType: string;
}

export const FormCheckout = (props: BoxProps) => {
  const [paymentType, setPaymentType] = useState<PaymentType>(
    PaymentType.CREDIT_CARD_MACHINE
  );

  const { control, handleSubmit, register } = useForm<IForm>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      paymentType: PaymentType.CREDIT_CARD_MACHINE,
    },
  });

  const onSubmit = handleSubmit(async () => {});

  return (
    <Box {...props} component="form" onSubmit={onSubmit}>
      <Typography component="h1">Finalize seu pedido</Typography>
      <Address />
      <Typography component="h2">Pagamento</Typography>
      <PaymentTypeRadio<IForm> control={control} name="paymentType" />
    </Box>
  );
};
