import { IProduct } from "../entities/IProduct";

export interface ICheckoutProduct extends IProduct {
  quantity: number;
}
