import { server } from "@/config/axios.config";
import { IFindAllPromotionsRequest } from "@/models/IFindAllPromotionsRequest";
import { IPromotion } from "@/models/entities/IPromotion";
import { BaseMockService } from "@/mocks/types/IMockService";
import { promotionMock } from "@/mocks/data/promotion.mock";

export class PromotionService extends BaseMockService {
  private static INSTANCE: PromotionService;
  private mockData: IPromotion[] = [];

  constructor() {
    super();
    if (this.useMock()) {
      this.mockData = [...promotionMock];
    }
  }

  async findAll(
    filter: Partial<IFindAllPromotionsRequest>
  ): Promise<IPromotion[]> {
    let promotions: IPromotion[];

    if (this.useMock()) {
      promotions = this.mockData;
    } else {
      const response = await server.get<IPromotion[]>("/promotion/all", {
        params: filter,
      });
      promotions = response.data;
    }

    // Converter datas para strings ISO
    return promotions.map((promotion) => ({
      ...promotion,
      created_at:
        promotion.created_at instanceof Date
          ? promotion.created_at.toISOString()
          : promotion.created_at,
      updated_at:
        promotion.updated_at instanceof Date
          ? promotion.updated_at.toISOString()
          : promotion.updated_at,
      deleted_at:
        promotion.deleted_at instanceof Date
          ? promotion.deleted_at.toISOString()
          : promotion.deleted_at,
    }));
  }

  async findById(id: string): Promise<IPromotion> {
    let promotion: IPromotion;

    if (this.useMock()) {
      const found = this.mockData.find((p) => p.id === id);
      if (!found) throw new Error("Promoção não encontrada");
      promotion = found;
    } else {
      const response = await server.get<IPromotion>(`/promotion/${id}`);
      promotion = response.data;
    }

    // Converter datas para strings ISO
    return {
      ...promotion,
      created_at:
        promotion.created_at instanceof Date
          ? promotion.created_at.toISOString()
          : promotion.created_at,
      updated_at:
        promotion.updated_at instanceof Date
          ? promotion.updated_at.toISOString()
          : promotion.updated_at,
      deleted_at:
        promotion.deleted_at instanceof Date
          ? promotion.deleted_at.toISOString()
          : promotion.deleted_at,
    };
  }

  static getInstance() {
    if (!this.INSTANCE) this.INSTANCE = new PromotionService();
    return this.INSTANCE;
  }
}
