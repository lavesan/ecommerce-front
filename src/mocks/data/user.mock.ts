import { IUser } from "@/models/entities/IUser";

export const userMock: IUser[] = [
  {
    id: "1",
    name: "Usuário Exemplo",
    email: "usuario@exemplo.com",
    password: "senha123",
    isAdmin: false,
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: undefined,
    enterprises: [],
  },
];
