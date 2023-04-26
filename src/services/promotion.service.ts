import { server } from "@/config/axios.config";
import { WeekDay } from "@/enums/WeekDay.enum";
import { IPromotion } from "@/models/entities/IPromotion";

export class PromotionService {
  private static INSTANCE: PromotionService;

  async findAllByWeekDay(weekDay: WeekDay): Promise<IPromotion[]> {
    const response = await server.get<IPromotion[]>(
      `/promotion/weekDay/${weekDay}`
    );
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
