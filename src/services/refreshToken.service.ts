import { server } from "@/config/axios.config";
import { IUserToken } from "@/models/context/IUserToken";

export class RefreshTokenService {
  private static INSTANCE: RefreshTokenService;

  async logout(): Promise<{ ok: boolean }> {
    const refreshToken = "";

    const response = await server.delete<{ ok: boolean }>(
      "/refresh-token/client/logout",
      {
        headers: {
          "x-access-token": `Bearer ${refreshToken}`,
        },
      }
    );
    return response.data;
  }

  async refresh(): Promise<IUserToken> {
    const refreshToken = "";

    const response = await server.post<IUserToken>(
      "/refresh-token/client/refresh",
      null,
      {
        headers: {
          "x-access-token": `Bearer ${refreshToken}`,
        },
      }
    );
    return response.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new RefreshTokenService();
    return this.INSTANCE;
  }
}
