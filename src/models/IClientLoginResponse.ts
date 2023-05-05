import { IUserToken } from "./context/IUserToken";
import { IClient } from "./entities/IClient";

export interface IClientLoginResponse extends IClient {
  credentials: IUserToken;
}
