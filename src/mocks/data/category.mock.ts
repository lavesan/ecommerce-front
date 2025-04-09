import { ICategory } from "@/models/entities/ICategory";

export const categoryMock: ICategory[] = [
  {
    id: "1",
    name: "Categoria Exemplo",
    description: "Descrição da categoria",
    isDisabled: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: undefined,
    products: [],
    enterprise: undefined,
  },
];
