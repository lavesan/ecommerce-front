import { IAddProductAdditional } from "../components/IAddProductAdditional";
import { IEnterpriseMenuProduct } from "../pages/IEnterpriseMenuProps";

interface ICheckoutProductAdditional extends IAddProductAdditional {}

export interface ICheckoutProduct extends IEnterpriseMenuProduct {
  key?: number;
  quantity: number;
  additionals: ICheckoutProductAdditional[];
}
