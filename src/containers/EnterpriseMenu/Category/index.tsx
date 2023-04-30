import { useMemo, useCallback } from "react";
import { Stack, Typography, Box, BoxProps } from "@mui/material";

import { maskMoney } from "@/helpers/money.helper";
import { useResponsive } from "@/hooks/useResponsive";
import { IPromotion } from "@/models/entities/IPromotion";
import { IEnterpriseMenuCategory } from "@/models/pages/IEnterpriseMenuProps";
import { ProductCard } from "@/components/ProductCard";
import { IProductProductCard } from "@/models/components/IProductProductCard";

interface ICategoryProps extends BoxProps {
  index: number;
  category: IEnterpriseMenuCategory;
  promotions: IPromotion[];
  addCategoryRef: (ref: HTMLDivElement) => void;
  setSelectedProd: (product: IProductProductCard) => void;
}

const Category = ({
  index,
  category,
  promotions,
  addCategoryRef,
  setSelectedProd,
  ...boxProps
}: ICategoryProps) => {
  const { isMobile } = useResponsive();

  const onRefChange = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        addCategoryRef(node);
      }
    },
    [addCategoryRef]
  );

  const products = useMemo<IProductProductCard[]>(() => {
    return (
      category?.products?.map(
        ({ value, promotionValue, promotionId, ...product }) => ({
          ...product,
          promotionId: promotionId || undefined,
          value: maskMoney(value),
          promotionValue: promotionValue ? maskMoney(promotionValue) : "",
        })
      ) || []
    );
  }, [category.products]);

  return (
    <Box {...boxProps} ref={onRefChange}>
      <Typography
        variant="h2"
        fontWeight="bold"
        marginBottom={2}
        fontSize={["1.5rem", "2.5rem"]}
      >
        {category.name}
      </Typography>
      <Stack spacing={4} direction="row" useFlexGap flexWrap="wrap">
        {products.map((product) => (
          <ProductCard
            key={`product_${product.id}`}
            product={product}
            sx={{
              width: isMobile ? "100%" : "48%",
            }}
            onClick={setSelectedProd}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Category;
