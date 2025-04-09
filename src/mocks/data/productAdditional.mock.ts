import { IProductAdditional } from "@/models/entities/IProductAdditional";

export const productAdditionalMock: IProductAdditional[] = [
  {
    id: "1",
    name: "Adicional Exemplo",
    imageKey: "adicional.jpg",
    value: 5.0,
    isDisabled: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: undefined,
    productAdditionalCategory: undefined,
    orderProductAdditional: [],
  },
];
