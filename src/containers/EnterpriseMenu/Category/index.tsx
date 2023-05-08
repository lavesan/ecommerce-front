import { useCallback } from "react";
import { Stack, Typography, Box, BoxProps } from "@mui/material";

import { useResponsive } from "@/hooks/useResponsive";
import { IPromotion } from "@/models/entities/IPromotion";
import {
  IEnterpriseMenuCategory,
  IEnterpriseMenuProduct,
} from "@/models/pages/IEnterpriseMenuProps";
import { ProductCard } from "@/components/ProductCard";

interface ICategoryProps extends BoxProps {
  index: number;
  category: IEnterpriseMenuCategory;
  promotions: IPromotion[];
  addCategoryRef: (ref: HTMLDivElement) => void;
  setSelectedProd: (product: IEnterpriseMenuProduct) => void;
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
        {category?.products?.map((product) => (
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
