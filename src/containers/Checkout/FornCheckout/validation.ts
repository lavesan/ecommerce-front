import { PaymentType } from "@/enums/PaymentType.enum";
import {
  ONLY_NUMBER_MSG,
  REQUIRED_MSG,
  onlyNumberReg,
} from "@/helpers/validation.helper";
import * as yup from "yup";

const requiredWhenMoney = (paymentType: any, schema: any) => {
  if ((paymentType as unknown as PaymentType) === PaymentType.MONEY)
    return schema.required(REQUIRED_MSG);
  return schema.notRequired();
};

export const validationSchema = yup.object({
  paymentType: yup
    .mixed()
    .oneOf([
      PaymentType.CREDIT_CARD_MACHINE,
      PaymentType.DEBIT_CARD_MACHINE,
      PaymentType.MONEY,
    ])
    .required(REQUIRED_MSG),
  hasCents: yup.boolean().when("paymentType", requiredWhenMoney),
  exchangeNotes: yup.array().of(
    yup.object({
      value: yup.number().when("paymentType", requiredWhenMoney),
      quantity: yup
        .string()
        .matches(onlyNumberReg, ONLY_NUMBER_MSG)
        .when("paymentType", requiredWhenMoney),
    })
  ),
});
