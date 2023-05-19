import {
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormControlLabelProps,
} from "@mui/material";
import { Controller, FieldValues, Control, Path } from "react-hook-form";

import { PaymentType } from "@/enums/PaymentType.enum";

interface IPaymentTypeRadioProps<IForm extends FieldValues> {
  control: Control<IForm>;
  name: Path<IForm>;
}

export function PaymentTypeRadio<IForm extends FieldValues>({
  control,
  name,
}: IPaymentTypeRadioProps<IForm>) {
  const optionStyle = (
    optValue: PaymentType,
    value: PaymentType
  ): Partial<FormControlLabelProps> => ({
    sx: (theme) => ({
      p: 2,
      mx: 0,
      border: `thin solid ${theme.palette.grey[300]}`,
      borderRadius: 2,
      transition: "0.2s",
      boxShadow: `0 0 0 ${theme.palette.grey[300]}`,
      ":hover": {
        boxShadow: `2px 2px 8px ${theme.palette.grey[300]}`,
      },
      borderColor: optValue === value ? "grey.500" : "grey.300",
    }),
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControl fullWidth>
          <RadioGroup
            aria-labelledby="payment-type-radio-group"
            defaultValue={value}
            value={value}
            name="payment-type-radio"
            onChange={onChange}
            sx={{ gap: 2 }}
          >
            <FormControlLabel
              {...optionStyle(PaymentType.CREDIT_CARD_MACHINE, value)}
              value={PaymentType.CREDIT_CARD_MACHINE}
              control={<Radio />}
              label="Cartão de crédito na entrega"
            />
            <FormControlLabel
              {...optionStyle(PaymentType.DEBIT_CARD_MACHINE, value)}
              value={PaymentType.DEBIT_CARD_MACHINE}
              control={<Radio />}
              label="Cartão de débito na entrega"
            />
            <FormControlLabel
              {...optionStyle(PaymentType.MONEY, value)}
              value={PaymentType.MONEY}
              control={<Radio />}
              label="Dinheiro"
            />
          </RadioGroup>
        </FormControl>
      )}
    />
  );
}
