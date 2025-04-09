import { server } from "@/config/axios.config";
import { getCredentialsToken } from "@/helpers/auth.helper";
import { IClientCreateResponse } from "@/models/IClientCreateResponse";
import { IClientLoginRequest } from "@/models/IClientLoginRequest";
import { IClientLoginResponse } from "@/models/IClientLoginResponse";
import { ICreateClientRequest } from "@/models/ICreateClientRequest";
import { IForgotPasswordRequest } from "@/models/IForgotPasswordRequest";
import { IResetPasswordRequest } from "@/models/IResetPasswordRequest";
import { IUpdateClientRequest } from "@/models/IUpdateClientRequest";
import { IClient } from "@/models/entities/IClient";
import { BaseMockService } from "@/mocks/types/IMockService";
import {
  clientMock,
  clientLoginResponseMock,
  clientCreateResponseMock,
} from "@/mocks/data/client.mock";

export class ClientService extends BaseMockService {
  private static INSTANCE: ClientService;
  private mockData: IClient[] = [];

  constructor() {
    super();
    if (this.useMock()) {
      this.mockData = [...clientMock];
    }
  }

  async login(body: IClientLoginRequest): Promise<IClientLoginResponse> {
    if (this.useMock()) {
      const client = this.mockData.find((c) => c.email === body.email);
      if (!client) throw new Error("Cliente não encontrado");
      return {
        ...clientLoginResponseMock,
        id: client.id,
        name: client.name,
        email: client.email,
        credentials: {
          accessToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          refreshToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        },
      };
    }
    const response = await server.post<IClientLoginResponse>(
      `/client/login`,
      body
    );
    return response.data;
  }

  async loginByGoogle(googleToken: string): Promise<IClientLoginResponse> {
    const response = await server.post<IClientLoginResponse>(
      `/client/google-oauth`,
      null,
      {
        headers: {
          Authorization: `Bearer ${googleToken}`,
        },
      }
    );
    return response.data;
  }

  async findMe(): Promise<IClient> {
    if (this.useMock()) {
      const storedCredentials = clientMock[0];
      const client = this.mockData.find((c) => c.id === storedCredentials?.id);
      if (!client) throw new Error("Cliente não encontrado");
      return client;
    }
    const response = await server.get<IClient>("/client/me");
    return response.data;
  }

  async create(body: ICreateClientRequest): Promise<IClientCreateResponse> {
    if (this.useMock()) {
      const newClient: IClient = {
        id: String(this.mockData.length + 1),
        ...body,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: undefined,
        points: 0,
        addresses: [],
        orders: [],
      };
      this.mockData.push(newClient);
      return {
        ...clientCreateResponseMock,
        credentials: {
          accessToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
          refreshToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        },
      };
    }
    const res = await server.post<IClientCreateResponse>("/client", body);
    return res.data;
  }

  async update(id: string, body: IUpdateClientRequest): Promise<boolean> {
    if (this.useMock()) {
      const index = this.mockData.findIndex((c) => c.id === id);
      if (index === -1) return false;
      this.mockData[index] = { ...this.mockData[index], ...body };
      return true;
    }
    const res = await server.put<boolean>(`/client/${id}`, body);
    return res.data;
  }

  async forgotPwd(body: IForgotPasswordRequest): Promise<boolean> {
    if (this.useMock()) {
      return true; // Simulando sucesso
    }
    const res = await server.post<boolean>("/client/forgot-password", body);
    return res.data;
  }

  async resetPwd(
    resetPwdToken: string,
    body: IResetPasswordRequest
  ): Promise<boolean> {
    if (this.useMock()) {
      return true; // Simulando sucesso
    }
    const res = await server.patch<boolean>("/client/reset-password", body, {
      headers: {
        Authorization: `Bearer ${resetPwdToken}`,
      },
    });
    return res.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new ClientService();
    return this.INSTANCE;
  }
}
