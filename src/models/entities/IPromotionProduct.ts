import { IProduct } from "./IProduct";
import { IPromotion } from "./IPromotion";

export interface IPromotionProduct {
  id: string;
  value: number;
  created_at: Date | string;
  updated_at?: Date | string;
  deleted_at?: Date | string;
  product?: IProduct;
  promotion?: IPromotion;
}
