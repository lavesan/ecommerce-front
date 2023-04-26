import { useMemo, useCallback } from "react";
import {
  Card,
  Stack,
  Typography,
  CardContent,
  Box,
  BoxProps,
  Link as MUILink,
} from "@mui/material";
import Link from "next/link";

import { maskMoney } from "@/helpers/money.helper";
import { useResponsive } from "@/hooks/useResponsive";
import { IPromotion } from "@/models/entities/IPromotion";
import { IEnterpriseMenuCategory } from "@/models/pages/IEnterpriseMenuProps";
import { ProductImage } from "./ProductImage";
import { ProductCard } from "@/components/ProductCard";
import { IProductProductCard } from "@/models/components/IProductProductCard";

interface ICategoryProps extends BoxProps {
  index: number;
  category: IEnterpriseMenuCategory;
  promotions: IPromotion[];
  addCategoryRef: (ref: HTMLDivElement) => void;
}

const Category = ({
  index,
  category,
  promotions,
  addCategoryRef,
  ...boxProps
}: ICategoryProps) => {
  const { isMobile } = useResponsive();

  const onRefChange = useCallback((node: HTMLDivElement) => {
    if (node) {
      addCategoryRef(node);
    }
  }, []);

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
            onClick={() => {}}
            sx={{
              width: isMobile ? "100%" : "49%",
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default Category;
