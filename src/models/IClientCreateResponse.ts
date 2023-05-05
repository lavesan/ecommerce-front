import { IUserToken } from "./context/IUserToken";
import { IClient } from "./entities/IClient";

export interface IClientCreateResponse extends IClient {
  credentials: IUserToken;
}
