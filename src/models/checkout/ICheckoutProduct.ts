import { IAddProductAdditional } from "../components/IAddProductAdditional";
import { IEnterpriseMenuProduct } from "../pages/IEnterpriseMenuProps";

interface ICheckoutProductAdditional extends IAddProductAdditional {}

export interface ICheckoutProduct extends IEnterpriseMenuProduct {
  quantity: number;
  additionals: ICheckoutProductAdditional[];
}
