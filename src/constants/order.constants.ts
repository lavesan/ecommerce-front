import { OrderStatus } from "@/enums/OrderStatus.enum";

export const activeOrders = [
  OrderStatus.TO_APPROVE,
  OrderStatus.DOING,
  OrderStatus.SENDING,
];

export const isActiveOrder = (status: OrderStatus) =>
  activeOrders.includes(status);
