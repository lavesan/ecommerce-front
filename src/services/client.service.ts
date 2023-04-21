import { server } from "@/config/axios.config";
import { IClientLoginRequest } from "@/models/IClientLoginRequest";
import { ICreateClientRequest } from "@/models/ICreateClientRequest";
import { IUpdateClientRequest } from "@/models/IUpdateClientRequest";
import { IClient } from "@/models/entities/IClient";

export class ClientService {
  private static INSTANCE: ClientService;

  async login(body: IClientLoginRequest): Promise<IClient> {
    const response = await server.post<IClient>(`/client/login`, body);
    return response.data;
  }

  async findById(id: string): Promise<IClient> {
    const response = await server.get<IClient>(`/client/${id}`);
    return response.data;
  }

  async create(body: ICreateClientRequest): Promise<IClient> {
    const res = await server.post<IClient>("/client", body);
    return res.data;
  }

  async update(id: string, body: IUpdateClientRequest): Promise<boolean> {
    const res = await server.put<boolean>(`/client/${id}`, body);
    return res.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new ClientService();
    return this.INSTANCE;
  }
}
