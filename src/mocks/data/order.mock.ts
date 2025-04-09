import { IOrder } from "@/models/entities/IOrder";
import { OrderStatus } from "@/enums/OrderStatus.enum";
import { PaymentType } from "@/enums/PaymentType.enum";

export const orderMock: IOrder[] = [
  {
    id: "1",
    freightValue: 10,
    productsValue: 89.9,
    paymentType: PaymentType.MONEY,
    moneyExchange: 0,
    status: OrderStatus.DOING,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: undefined,
    orderProducts: [],
    address: undefined,
    client: undefined,
    enterprise: undefined,
    freight: undefined,
  },
];
