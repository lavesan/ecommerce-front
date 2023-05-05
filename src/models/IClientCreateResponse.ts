import { IClient } from "./entities/IClient";

export interface IClientCreateResponse extends IClient {
  credentials: {
    accessToken: string;
    refreshToken: string;
  };
}
