import { useMemo } from "react";
import { useRouter } from "next/router";
import { Box, Typography, BoxProps, Button, Collapse } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "./validation";
import { Address } from "./Address";
import { PaymentType } from "@/enums/PaymentType.enum";
import { PaymentTypeRadio } from "./PaymentTypeRadio";
import { OrderService } from "@/services/order.service";
import { MoneyExchange } from "./MoneyExchange";
import { exchangeIsEnough } from "@/helpers/checkout.helper";
import { useCheckoutContext } from "@/hooks/useCheckoutContext";
import { useAppContext } from "@/hooks/useAppContext";
import { useGoBack } from "@/hooks/useGoBack";
import { useResponsive } from "@/hooks/useResponsive";
import { IOrderCreateRequest } from "@/models/IOrderCreateRequest";

export interface IForm {
  paymentType: string;
  exchangeNotes: {
    value: number;
    quantity: string;
  }[];
  hasCents: boolean;
}

export const FormCheckout = (props: BoxProps) => {
  const orderService = OrderService.getInstance();

  const { showToast, user, toogleAddressModal } = useAppContext();
  const {
    total,
    freightTotal,
    prodTotal,
    address,
    freight,
    enterprise,
    products,
  } = useCheckoutContext();

  const { isMobile } = useResponsive();
  const { storeGoBackUrl } = useGoBack();

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      paymentType: PaymentType.CREDIT_CARD_MACHINE,
      exchangeNotes: [],
      hasCents: false,
    },
  });

  const paymentType = useWatch({
    control,
    name: "paymentType",
  });

  const exchangeNotes = useWatch({
    control,
    name: "exchangeNotes",
  });

  const disableFinishButton = useMemo(() => {
    return (
      (paymentType === PaymentType.MONEY &&
        !exchangeIsEnough(exchangeNotes, total)) ||
      !isValid
    );
  }, [isValid, exchangeNotes, paymentType, total]);

  const onSubmit = handleSubmit(
    async ({ paymentType, exchangeNotes, hasCents, ...values }) => {
      if (!user) {
        showToast({ status: "error", message: "Entre ou crie sua conta" });
        storeGoBackUrl("/pagamento");
        return router.push("/login");
      }

      if (
        paymentType === PaymentType.MONEY &&
        !exchangeIsEnough(exchangeNotes, total)
      ) {
        return showToast({
          status: "error",
          message: "Adicione o troco necessário",
        });
      }

      if (!address) {
        showToast({ status: "error", message: "Adicione um endereço" });

        if (isMobile) {
          storeGoBackUrl("/pagamento");
          return router.push("/endereco");
        }

        return toogleAddressModal();
      }

      if (!enterprise) {
        showToast({
          status: "warning",
          message: "O carrinho está vazio, olhe nossos menus!",
        });
        return router.push("/");
      }

      let exchangeObj: Pick<IOrderCreateRequest, "moneyExchange" | "hasCents"> =
        {
          moneyExchange: [],
        };

      if (paymentType === PaymentType.MONEY) {
        exchangeObj = {
          hasCents,
          moneyExchange: exchangeNotes.map(({ value, quantity }) => ({
            value,
            quantity: Number.isNaN(quantity) ? 0 : Number(quantity),
          })),
        };
      }

      orderService.create({
        address,
        products: products.map(
          ({ id, quantity, value, givenPoints, additionals }) => ({
            id,
            value,
            quantity,
            points: givenPoints,
            additionals,
          })
        ),
        freightId: freight?.id || "",
        freightValue: freightTotal,
        enterpriseId: enterprise.id,
        productsValue: prodTotal,
        paymentType: paymentType as PaymentType,
        ...values,
        ...exchangeObj,
      });
    }
  );

  return (
    <Box {...props} component="form" onSubmit={onSubmit}>
      <Typography component="h1" fontSize="40px">
        Finalize seu pedido
      </Typography>
      <Address />
      <Typography component="h2" fontSize="28px" mb={2}>
        Pagamento
      </Typography>
      <PaymentTypeRadio<IForm> control={control} name="paymentType" />
      <Collapse in={paymentType === PaymentType.MONEY}>
        <MoneyExchange mt={4} control={control} errors={errors} />
      </Collapse>
      <Button
        fullWidth
        disabled={disableFinishButton}
        variant="contained"
        type="submit"
        size="large"
        sx={{ mt: 4, textTransform: "none" }}
      >
        Finalizar
      </Button>
    </Box>
  );
};
