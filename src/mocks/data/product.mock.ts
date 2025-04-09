import { IProduct } from "@/models/entities/IProduct";

export const productMock: IProduct[] = [
  {
    id: "1",
    name: "Produto Exemplo",
    description: "Descrição do produto",
    boldDescription: "Destaque do produto",
    imageKey: "produto.jpg",
    value: 49.9,
    givenPoints: 5,
    sellPoints: 50,
    isDisabled: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: undefined,
    category: undefined,
    productAdditionalCategory: [],
    orderProducts: [],
    promotionProduct: undefined,
  },
];
