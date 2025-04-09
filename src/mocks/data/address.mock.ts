import { IAddress } from "@/models/entities/IAddress";

export const addressMock: IAddress[] = [
  {
    id: "1",
    cep: "01001-000",
    street: "Rua Exemplo",
    complement: "Apto 101",
    number: "123",
    district: "Centro",
    state: "SP",
    city: "São Paulo",
    shortName: "Casa",
    isDefault: true,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: undefined,
  },
];
