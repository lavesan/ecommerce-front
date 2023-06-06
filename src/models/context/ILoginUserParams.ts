import { IClient } from "../entities/IClient";
import { ICredentialsToken } from "./ICredentialsToken";

export interface ILoginUserParams {
  client: IClient;
  credentials: ICredentialsToken;
}
