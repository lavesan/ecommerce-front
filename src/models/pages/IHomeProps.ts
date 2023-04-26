import { IEnterprise } from "../entities/IEnterprise";
import { IPromotion } from "../entities/IPromotion";

export interface IHomeProps {
  enterprises: IEnterprise[];
  promotions: IPromotion[];
}
