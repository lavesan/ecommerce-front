import { WeekDay } from "@/enums/WeekDay.enum";
import { IEnterprise } from "./IEnterprise";
import { IPromotionProduct } from "./IPromotionProduct";

export interface IPromotion {
  id: string;
  name: string;
  description: string;
  imageKey: string;
  weekDay: WeekDay;
  isDisabled: boolean;
  created_at: Date | string;
  updated_at?: Date | string;
  deleted_at?: Date | string;
  enterprise?: IEnterprise;
  promotionProducts?: IPromotionProduct[];
}
