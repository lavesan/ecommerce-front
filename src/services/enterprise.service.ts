import { server } from "@/config/axios.config";
import { IFindAllEnterpriseRequest } from "@/models/IFindAllEnterpriseRequest";
import { IEnterprise } from "@/models/entities/IEnterprise";
import { BaseMockService } from "@/mocks/types/IMockService";
import { enterpriseMock } from "@/mocks/data/enterprise.mock";

export class EnterpriseService extends BaseMockService {
  private static INSTANCE: EnterpriseService;
  private mockData: IEnterprise[] = [];

  constructor() {
    super();
    if (this.useMock()) {
      this.mockData = [...enterpriseMock];
    }
  }

  async findMenu(id: string): Promise<IEnterprise> {
    const response = await server.get<IEnterprise>(`/enterprise/menu/${id}`);
    return response.data;
  }

  async findAll(
    params: Partial<IFindAllEnterpriseRequest> = {}
  ): Promise<IEnterprise[]> {
    if (this.useMock()) {
      return this.mockData;
    }
    const response = await server.get<IEnterprise[]>("/enterprise/all", {
      params,
    });
    return response.data;
  }

  async findById(id: string): Promise<IEnterprise> {
    if (this.useMock()) {
      const enterprise = this.mockData.find((e) => e.id === id);
      if (!enterprise) throw new Error("Empresa não encontrada");
      return enterprise;
    }
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
