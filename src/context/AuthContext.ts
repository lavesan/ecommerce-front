import React from "react";

import { ILoginUserParams } from "@/models/context/ILoginUserParams";
import { ICredentialsToken } from "@/models/context/ICredentialsToken";
import { IAddress } from "@/models/entities/IAddress";
import { IClient } from "@/models/entities/IClient";

export const AuthContext = React.createContext({
  user: null as IClient | null,
  token: null as ICredentialsToken | null,
  addresses: [] as IAddress[],
  getMe: async () => {},
  login: (data: ILoginUserParams) => {},
  logout: () => {},
  setToken: (credentials: ICredentialsToken) => {},
  setUser: (user: IClient | null) => {},
});
