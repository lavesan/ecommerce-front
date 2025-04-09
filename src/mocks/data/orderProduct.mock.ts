import { IOrderProduct } from "@/models/entities/IOrderProduct";

export const orderProductMock: IOrderProduct[] = [
  {
    id: "1",
    quantity: 2,
    value: 49.9,
    points: 5,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: undefined,
    order: undefined,
    product: undefined,
    additionals: [],
  },
];
