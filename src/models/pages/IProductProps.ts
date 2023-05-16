import { IEnterprise } from "../entities/IEnterprise";
import { IPromotion } from "../entities/IPromotion";
import { IEnterpriseMenuProduct } from "./IEnterpriseMenuProps";

export interface IProductProps {
  product: IEnterpriseMenuProduct | null;
  promotion?: IPromotion | null;
  enterprise: IEnterprise | null;
}
