import axios from "axios";

import { server } from "@/config/axios.config";
import { getCredentialsToken } from "@/helpers/auth.helper";
import { ICredentialsToken } from "@/models/context/ICredentialsToken";
import { BaseMockService } from "@/mocks/types/IMockService";

export class RefreshTokenService extends BaseMockService {
  private static INSTANCE: RefreshTokenService;

  async logout(): Promise<{ ok: boolean }> {
    if (this.useMock()) {
      return { ok: true }; // Simulando sucesso no logout
    }

    const storedCredentials = getCredentialsToken();

    if (!storedCredentials) throw new Error("Não existe um token salvo");

    const response = await server.delete<{ ok: boolean }>(
      "/refresh-token/client/logout",
      {
        headers: {
          "x-access-token": storedCredentials.refreshToken,
        },
      }
    );
    return response.data;
  }

  async refresh(): Promise<ICredentialsToken> {
    if (this.useMock()) {
      return {
        accessToken: "mock-jwt-token",
        refreshToken: "mock-refresh-token",
      }; // Simulando retorno do refresh token
    }

    const storedCredentials = getCredentialsToken();

    if (!storedCredentials) throw new Error("Não existe um token salvo");

    return axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/refresh-token/client/refresh`,
        null,
        {
          headers: {
            "x-access-token": storedCredentials.refreshToken,
          },
        }
      )
      .then((res) => res.data);
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new RefreshTokenService();
    return this.INSTANCE;
  }
}
