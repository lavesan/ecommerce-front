import { WeekDay } from "@/enums/WeekDay.enum";

export interface IFindAllPromotionsRequest {
  enterpriseId: string;
  weekDay: WeekDay;
}
