import { IClient } from "@/models/entities/IClient";
import { IClientLoginResponse } from "@/models/IClientLoginResponse";
import { IClientCreateResponse } from "@/models/IClientCreateResponse";

export const clientMock: IClient[] = [
  {
    id: "1",
    name: "Cliente Exemplo",
    email: "cliente@exemplo.com",
    password: "senha123",
    cpf: "123.456.789-00",
    points: 0,
    phone: "11999999999",
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: undefined,
    addresses: [],
    orders: [],
  },
];

export const clientLoginResponseMock: IClientLoginResponse = {
  id: clientMock[0].id,
  name: clientMock[0].name,
  email: clientMock[0].email,
  password: clientMock[0].password,
  cpf: clientMock[0].cpf,
  points: clientMock[0].points,
  phone: clientMock[0].phone,
  created_at: clientMock[0].created_at,
  updated_at: clientMock[0].updated_at,
  deleted_at: clientMock[0].deleted_at,
  addresses: clientMock[0].addresses,
  orders: clientMock[0].orders,
  credentials: {
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    refreshToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  },
};

export const clientCreateResponseMock: IClientCreateResponse = {
  ...clientLoginResponseMock,
};
