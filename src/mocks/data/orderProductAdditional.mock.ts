import { IOrderProductAdditional } from "@/models/entities/IOrderProductAdditional";

export const orderProductAdditionalMock: IOrderProductAdditional[] = [
  {
    id: "1",
    quantity: 1,
    value: 5.0,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: undefined,
    productAdditional: undefined,
    orderProduct: undefined,
  },
];
