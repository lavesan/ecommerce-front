import { IClient } from "../entities/IClient";
import { IUserToken } from "./IUserToken";

export interface ILoginUserParams {
  client: IClient;
  credentials: IUserToken;
}
