import { IOrderCreateAdditional } from "../IOrderCreateRequest";

export interface IAddProductAdditional extends IOrderCreateAdditional {
  addCategoryId: string;
  name: string;
}
