import { server } from "@/config/axios.config";
import { IFindAllEnterpriseRequest } from "@/models/IFindAllEnterpriseRequest";
import { IEnterprise } from "@/models/entities/IEnterprise";

export class EnterpriseService {
  private static INSTANCE: EnterpriseService;

  async findMenu(id: string): Promise<IEnterprise> {
    const response = await server.get<IEnterprise>(`/enterprise/menu/${id}`);
    return response.data;
  }

  async findAll(
    params: Partial<IFindAllEnterpriseRequest> = {}
  ): Promise<IEnterprise[]> {
    const response = await server.get<IEnterprise[]>("/enterprise/all", {
      params,
    });
    return response.data;
  }

  async findById(id: string): Promise<IEnterprise> {
    const response = await server.get<IEnterprise>(`/enterprise/${id}`);
    return response.data;
  }

  async findAllWithProducts(): Promise<IEnterprise[]> {
    const response = await server.get<IEnterprise[]>(
      "/enterprise/all/products"
    );
    return response.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new EnterpriseService();
    return this.INSTANCE;
  }
}
