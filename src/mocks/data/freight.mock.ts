import { IFreight } from "@/models/entities/IFreight";

export const freightMock: IFreight[] = [
  {
    id: "1",
    addressKey: "distrito",
    addressValue: "Centro",
    value: 10.0,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: undefined,
    enterprise: undefined,
    orders: [],
  },
];
