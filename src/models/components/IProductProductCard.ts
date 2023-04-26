import { IProduct } from "../entities/IProduct";

export interface IProductProductCard extends Omit<IProduct, "value"> {
  promotionId?: string;
  promotionValue?: string;
  value: string;
}
