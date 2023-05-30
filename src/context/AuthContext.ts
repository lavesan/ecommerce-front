import React from "react";

import { ILoginUserParams } from "@/models/context/ILoginUserParams";
import { IUserToken } from "@/models/context/IUserToken";
import { IAddress } from "@/models/entities/IAddress";
import { IClient } from "@/models/entities/IClient";

export const AuthContext = React.createContext({
  user: null as IClient | null,
  token: null as IUserToken | null,
  addresses: [] as IAddress[],
  getMe: async () => {},
  login: (data: ILoginUserParams) => {},
  logout: () => {},
  setToken: (token: string) => {},
  setUser: (user: IClient | null) => {},
});
