import { server } from "@/config/axios.config";
import { getStorageToken } from "@/helpers/auth.helper";
import { IClientCreateResponse } from "@/models/IClientCreateResponse";
import { IClientLoginRequest } from "@/models/IClientLoginRequest";
import { IClientLoginResponse } from "@/models/IClientLoginResponse";
import { ICreateClientRequest } from "@/models/ICreateClientRequest";
import { IForgotPasswordRequest } from "@/models/IForgotPasswordRequest";
import { IResetPasswordRequest } from "@/models/IResetPasswordRequest";
import { IUpdateClientRequest } from "@/models/IUpdateClientRequest";
import { IClient } from "@/models/entities/IClient";

export class ClientService {
  private static INSTANCE: ClientService;

  async login(body: IClientLoginRequest): Promise<IClientLoginResponse> {
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
    const response = await server.get<IClient>(`/client/me`, {
      // @ts-ignore
      notLoad: true,
      headers: {
        Authorization: `Bearer ${getStorageToken()}`,
      },
    });
    // @ts-ignore
    return response.data;
  }

  async create(body: ICreateClientRequest): Promise<IClientCreateResponse> {
    const res = await server.post<IClientCreateResponse>("/client", body);
    return res.data;
  }

  async update(id: string, body: IUpdateClientRequest): Promise<boolean> {
    const res = await server.put<boolean>(`/client/${id}`, body);
    return res.data;
  }

  async forgotPwd(body: IForgotPasswordRequest): Promise<boolean> {
    const res = await server.post<boolean>("/client/forgot-password", body);
    return res.data;
  }

  async resetPwd(
    resetPwdToken: string,
    body: IResetPasswordRequest
  ): Promise<boolean> {
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
