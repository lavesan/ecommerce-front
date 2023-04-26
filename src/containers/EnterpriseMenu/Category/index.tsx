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

import { getImgUrl } from "@/helpers/image.helper";
import { maskMoney } from "@/helpers/money.helper";
import Link from "next/link";
import { useResponsive } from "@/hooks/useResponsive";
import { elemCategoryId } from "@/helpers/category.helper";
import { IPromotion } from "@/models/entities/IPromotion";
import { IEnterpriseMenuCategory } from "@/models/pages/IEnterpriseMenuProps";

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

  const products = useMemo(() => {
    return (
      category?.products?.map(({ value, promotionValue, ...product }) => ({
        ...product,
        value: maskMoney(value),
        promotionValue: promotionValue
          ? maskMoney(promotionValue)
          : promotionValue,
      })) || []
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
          <MUILink
            key={`product_${product.id}`}
            component={Link}
            color="inherit"
            href={`/produto/${product.id}`}
            underline="none"
            sx={{ width: isMobile ? "100%" : "49%" }}
          >
            <Card
              sx={{
                transition: "0.3s",
                ":hover": {
                  boxShadow: "1px 1px 8px gray",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
                padding={[2, 4]}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: 0,
                    paddingRight: "0.5rem",
                  }}
                >
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    fontSize={["1rem", "2rem"]}
                    marginBottom={[0, 2]}
                  >
                    {product.name}
                  </Typography>
                  <Typography variant="body2" fontSize={["small", "medium"]}>
                    {product.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    fontSize="large"
                    fontWeight="bold"
                    marginTop="auto"
                  >
                    <Box
                      component="span"
                      sx={
                        product.promotionValue
                          ? (theme) => ({
                              textDecoration: "line-through",
                              textDecorationColor: theme.palette.primary.main,
                              marginRight: "0.5rem",
                            })
                          : {}
                      }
                    >
                      {product.value}
                    </Box>
                    {product.promotionValue && product.promotionValue}
                  </Typography>
                </CardContent>
                <Box
                  component="img"
                  alt={`produto ${product.name}`}
                  src={getImgUrl(product.imageKey)}
                  width={["3.125rem", "30%"]}
                  height={["3.125rem", "auto"]}
                />
              </Box>
            </Card>
          </MUILink>
        ))}
      </Stack>
    </Box>
  );
};

export default Category;
