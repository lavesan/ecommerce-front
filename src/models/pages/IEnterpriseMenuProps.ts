import { ICategory } from "../entities/ICategory";
import { IEnterprise } from "../entities/IEnterprise";
import { IProduct } from "../entities/IProduct";

interface IEnterpriseMenuProduct extends IProduct {
  promotionId?: string | null;
  promotionValue?: number | null;
}

export interface IEnterpriseMenuCategory extends ICategory {
  products?: IEnterpriseMenuProduct[];
}

export interface IEnterpriseMenuProps {
  menu: IEnterprise & {
    categories?: IEnterpriseMenuCategory[];
  };
}
