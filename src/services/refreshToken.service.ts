import axios from "axios";

import { server } from "@/config/axios.config";
import { getCredentialsToken } from "@/helpers/auth.helper";
import { ICredentialsToken } from "@/models/context/ICredentialsToken";

export class RefreshTokenService {
  private static INSTANCE: RefreshTokenService;

  async logout(): Promise<{ ok: boolean }> {
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
