import { ICategory } from "../entities/ICategory";
import { IEnterprise } from "../entities/IEnterprise";
import { IProduct } from "../entities/IProduct";

export interface IEnterpriseMenuProduct extends IProduct {
  promotionId?: string | null;
  valueFormat: string;
  promotionValue?: number | null;
  promotionValueFormat?: string | null;
}

export interface IEnterpriseMenuCategory extends ICategory {
  products?: IEnterpriseMenuProduct[];
}

export type EnterpriseMenuFormattedType = IEnterprise & {
  categories?: IEnterpriseMenuCategory[];
};

export interface IEnterpriseMenuProps {
  menu: EnterpriseMenuFormattedType;
}
