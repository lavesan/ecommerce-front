import { OrderStatus } from "@/enums/OrderStatus.enum";
import { PaymentType } from "@/enums/PaymentType.enum";
import { format, parse } from "date-fns";

export const phoneMask = "(99) 99999-9999";
export const cpfMask = "999.999.999-99";
export const cepMask = "99999-999";

export const maskDate = (dateString: any): string => {
  if (!dateString) return "";
  const onlyDate = dateString.match(/\d{4}-\d{2}-\d{2}/g);
  if (!onlyDate?.length) return "";
  const parsedDate = parse(onlyDate[0], "yyyy-MM-dd", new Date());
  return format(parsedDate, "dd/MM/yyyy");
};

export const addDigits = (digits: number) => {
  return digits.toString().length > 1 ? digits : `0${digits}`;
};

export const maskDateTime = (dateString: any): string => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return `${addDigits(date.getDate())}/${addDigits(
    date.getMonth() + 1
  )}/${date.getFullYear()} ${addDigits(date.getHours())}:${addDigits(
    date.getMinutes()
  )}h`;
};

export const translatePaymentType = {
  [PaymentType.CREDIT_CARD_MACHINE]: "Pago na maquininha de cartão de crédito",
  [PaymentType.DEBIT_CARD_MACHINE]: "Pago na maquininha de cartão de débito",
  [PaymentType.MONEY]: "Pago em dinheiro",
};

export const translateOrderStatus = {
  [OrderStatus.CANCELED]: "Cancelado",
  [OrderStatus.DELETED]: "Deletado",
  [OrderStatus.DOING]: "Fazendo",
  [OrderStatus.DONE]: "Feito",
  [OrderStatus.SENDING]: "Entregando",
  [OrderStatus.TO_APPROVE]: "A aprovar",
};
