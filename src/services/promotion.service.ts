import { server } from "@/config/axios.config";
import { IFindAllPromotionsRequest } from "@/models/IFindAllPromotionsRequest";
import { IPromotion } from "@/models/entities/IPromotion";

export class PromotionService {
  private static INSTANCE: PromotionService;

  async findAll(
    filter: Partial<IFindAllPromotionsRequest>
  ): Promise<IPromotion[]> {
    const response = await server.get<IPromotion[]>("/promotion/all", {
      params: filter,
    });
    return response.data;
  }

  async findById(id: string): Promise<IPromotion> {
    const response = await server.get<IPromotion>(`/promotion/${id}`);
    return response.data;
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new PromotionService();
    return this.INSTANCE;
  }
}
