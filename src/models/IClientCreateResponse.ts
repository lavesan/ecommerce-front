import { ICredentialsToken } from "./context/ICredentialsToken";
import { IClient } from "./entities/IClient";

export interface IClientCreateResponse extends IClient {
  credentials: ICredentialsToken;
}
