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
  const handlePaymentType = {
    [PaymentType.CREDIT_CARD_MACHINE]: {
      icon: "",
      label: "Cartão de crédito",
      value: PaymentType.CREDIT_CARD_MACHINE,
    },
    [PaymentType.DEBIT_CARD_MACHINE]: {
      icon: "",
      label: "Cartão de débito",
      value: PaymentType.DEBIT_CARD_MACHINE,
    },
    [PaymentType.MONEY]: {
      icon: "",
      label: "Dinheiro",
      value: PaymentType.MONEY,
    },
  };

  const optionStyle: Partial<FormControlLabelProps> = {
    sx: (theme) => ({
      p: 2,
      border: `thin solid ${theme.palette.grey[300]}`,
      borderRadius: 2,
      transition: "0.2s",
      boxShadow: `1px 1px 0 gray`,
      _hover: {
        boxShadow: `1px 1px 3px ${theme.palette.grey[600]}`,
      },
      _selected: {
        borderColor: "grey.500",
      },
    }),
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControl>
          <RadioGroup
            aria-labelledby="payment-type-radio-group"
            defaultValue={value}
            value={value}
            name="payment-type-radio"
            onChange={onChange}
          >
            <FormControlLabel
              {...optionStyle}
              value={PaymentType.CREDIT_CARD_MACHINE}
              control={<Radio />}
              label="Cartão de crédito"
            />
            <FormControlLabel
              {...optionStyle}
              value={PaymentType.DEBIT_CARD_MACHINE}
              control={<Radio />}
              label="Cartão de débito"
            />
            <FormControlLabel
              {...optionStyle}
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
