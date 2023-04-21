import { server } from "@/config/axios.config";
import { IEnterprise } from "@/models/entities/IEnterprise";

export class EnterpriseService {
  private static INSTANCE: EnterpriseService;

  async findMenu(id: string): Promise<IEnterprise> {
    const response = await server.get<IEnterprise>(`/enterprise/menu/${id}`);
    return response.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new EnterpriseService();
    return this.INSTANCE;
  }
}
