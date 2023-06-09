import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { WeekDay } from "@/enums/WeekDay.enum";
import { maskMoney } from "@/helpers/money.helper";
import { IPromotionProduct } from "@/models/entities/IPromotionProduct";
import { IEnterpriseMenuProduct } from "@/models/pages/IEnterpriseMenuProps";
import { IProductProps } from "@/models/pages/IProductProps";
import { EnterpriseService } from "@/services/enterprise.service";
import { ProductService } from "@/services/product.service";
import { useFindAllPromotionsQuery } from "./useFindAllPromotionsQuery";

interface IUseProductQuery {
  weekDay: WeekDay;
  productId: string;
  enterpriseId: string;
}

interface IUseProductQueryReturn {
  result: IProductProps | null;
}

export const useProductQuery = ({
  enterpriseId,
  weekDay,
  productId,
}: IUseProductQuery): IUseProductQueryReturn => {
  const productService = ProductService.getInstance();
  const enterpriseService = EnterpriseService.getInstance();

  const { data: enterprise } = useQuery({
    queryKey: ["enterprise", enterpriseId],
    queryFn: () => enterpriseService.findById(enterpriseId),
    refetchInterval: 5 * 60000,
  });

  const { data: promotions } = useFindAllPromotionsQuery({
    weekDay,
    enterpriseId,
  });

  const { data: product } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => productService.findById(productId),
    refetchInterval: 5 * 60000,
  });

  const result = useMemo(() => {
    if (!enterprise || !product || !promotions) return null;

    let promotionProduct: IPromotionProduct | undefined;

    const promotion =
      promotions.find((promotion) => {
        promotionProduct = promotion.promotionProducts?.find((prodPromo) => {
          return prodPromo.product?.id === productId;
        });

        return !!promotionProduct;
      }) || null;

    const formattedProduct: IEnterpriseMenuProduct = {
      ...product,
      promotionId: promotion?.id || null,
      promotionValue: promotionProduct?.value || null,
      promotionValueFormat: maskMoney(promotionProduct?.value) || null,
      valueFormat: maskMoney(product.value),
    };

    return {
      promotion,
      enterprise,
      product: formattedProduct,
    };
  }, [enterprise, product, promotions, productId]);

  return {
    result,
  };
};
