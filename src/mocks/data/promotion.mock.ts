import { IPromotion } from "@/models/entities/IPromotion";
import { WeekDay } from "@/enums/WeekDay.enum";

const now = new Date().toISOString();

export const promotionMock: IPromotion[] = [
  {
    id: "1",
    name: "Promoção Exemplo",
    description: "Descrição da promoção",
    imageKey: "promocao.jpg",
    weekDay: WeekDay.SEG,
    isDisabled: false,
    created_at: now,
    updated_at: now,
    deleted_at: undefined,
    enterprise: undefined,
    promotionProducts: [],
  },
];
