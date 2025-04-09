import { server } from "@/config/axios.config";
import { ICreateAddressRequest } from "@/models/ICreateAddressRequest";
import { IFindByCepResponse } from "@/models/IFindByCepResponse";
import { IUpdateAddressRequest } from "@/models/IUpdateAddressRequest";
import { IAddress } from "@/models/entities/IAddress";
import { BaseMockService } from "@/mocks/types/IMockService";
import { addressMock } from "@/mocks/data/address.mock";

export class AddressService extends BaseMockService {
  private static INSTANCE: AddressService;
  private mockData: IAddress[] = [];

  constructor() {
    super();
    if (this.useMock()) {
      this.mockData = [...addressMock];
    }
  }

  async create(address: ICreateAddressRequest): Promise<IAddress> {
    if (this.useMock()) {
      const newAddress: IAddress = {
        id: String(this.mockData.length + 1),
        ...address,
        isDefault: this.mockData.length === 0,
        created_at: new Date(),
        updated_at: new Date(),
      };
      this.mockData.push(newAddress);
      return newAddress;
    }
    const response = await server.post<IAddress>(`/address`, address);
    return response.data;
  }

  async update(id: string, address: IUpdateAddressRequest): Promise<boolean> {
    if (this.useMock()) {
      const index = this.mockData.findIndex((a) => a.id === id);
      if (index === -1) return false;
      this.mockData[index] = { ...this.mockData[index], ...address };
      return true;
    }
    const response = await server.put<boolean>(`/address/${id}`, address);
    return response.data;
  }

  async updateDefault(id: string): Promise<boolean> {
    if (this.useMock()) {
      this.mockData = this.mockData.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }));
      return true;
    }
    const response = await server.patch<boolean>(`/address/${id}`, null, {
      // @ts-ignore
      notLoad: true,
    });
    return response.data;
  }

  async delete(id: string): Promise<boolean> {
    if (this.useMock()) {
      const initialLength = this.mockData.length;
      this.mockData = this.mockData.filter((a) => a.id !== id);
      return this.mockData.length !== initialLength;
    }
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
