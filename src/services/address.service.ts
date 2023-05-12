import { server } from "@/config/axios.config";
import { ICreateAddressRequest } from "@/models/ICreateAddressRequest";
import { IFindByCepResponse } from "@/models/IFindByCepResponse";
import { IUpdateAddressDefaultRequest } from "@/models/IUpdateAddressDefaultRequest";
import { IUpdateAddressRequest } from "@/models/IUpdateAddressRequest";
import { IAddress } from "@/models/entities/IAddress";

export class AddressService {
  private static INSTANCE: AddressService;

  async create(address: ICreateAddressRequest): Promise<IAddress> {
    const response = await server.post<IAddress>(`/address`, address);
    return response.data;
  }

  async update(id: string, address: IUpdateAddressRequest): Promise<boolean> {
    const response = await server.put<boolean>(`/address/${id}`, address);
    return response.data;
  }

  async updateDefault(
    id: string,
    body: IUpdateAddressDefaultRequest
  ): Promise<boolean> {
    const response = await server.patch<boolean>(`/address/${id}`, body, {
      // @ts-ignore
      notLoad: true,
    });
    // @ts-ignore
    return response.data;
  }

  async delete(id: string): Promise<boolean> {
    const response = await server.delete<boolean>(`/address/${id}`);
    return response.data;
  }

  async findByCep(cep: string): Promise<IFindByCepResponse> {
    const response = await server.get<IFindByCepResponse>(
      `https://viacep.com.br/ws/${cep}/json/`
    );
    return response.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new AddressService();
    return this.INSTANCE;
  }
}
