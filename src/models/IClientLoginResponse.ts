import { ICredentialsToken } from "./context/ICredentialsToken";
import { IClient } from "./entities/IClient";

export interface IClientLoginResponse extends IClient {
  credentials: ICredentialsToken;
}
