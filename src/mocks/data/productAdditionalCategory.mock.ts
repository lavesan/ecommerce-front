import { IProductAdditionalCategory } from "@/models/entities/IProductAdditionalCategory";
import { ProductAdditionalType } from "@/enums/ProductAdditionalType.enum";

export const productAdditionalCategoryMock: IProductAdditionalCategory[] = [
  {
    id: "1",
    name: "Categoria de Adicionais",
    description: "Descrição da categoria de adicionais",
    limit: 3,
    type: ProductAdditionalType.ONE_SELECT,
    isDisabled: false,
    isOptional: true,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: undefined,
    productAdditionals: [],
    product: undefined,
  },
];
