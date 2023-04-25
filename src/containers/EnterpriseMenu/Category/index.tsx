import { useMemo, useRef, useEffect } from "react";
import {
  Card,
  Stack,
  Typography,
  CardContent,
  Box,
  BoxProps,
  Link as MUILink,
} from "@mui/material";
// @ts-ignore
import { useIsVisible } from "react-is-visible";

import { ICategory } from "@/models/entities/ICategory";
import { getImgUrl } from "@/helpers/image.helper";
import { maskMoney } from "@/helpers/money.helper";
import Link from "next/link";
import { useResponsive } from "@/hooks/useResponsive";
import { elemCategoryId } from "@/helpers/category.helper";

interface ICategoryProps extends BoxProps {
  category: ICategory;
  index: number;
  onVisibilityChange: (index: number, isShow: boolean) => void;
}

export const Category = ({
  category,
  index,
  onVisibilityChange,
  ...boxProps
}: ICategoryProps) => {
  const { isMobile } = useResponsive();

  const elemRef = useRef<HTMLHeadingElement>(null);
  const isVisible = useIsVisible(elemRef);

  const products = useMemo(() => {
    return (
      category?.products?.map(({ value, ...product }) => ({
        ...product,
        value: maskMoney(value),
      })) || []
    );
  }, [category.products]);

  const onScroll = () => {
    if (
      elemRef.current &&
      elemRef.current?.offsetTop > document.body.scrollTop
    ) {
      console.log("elemRef.current?.offsetTop: ", elemRef.current?.offsetTop);
      console.log("document.body.scrollTop: ", document.body.scrollTop);
      onVisibilityChange(index, true);
    }
  };

  useEffect(() => {
    // onVisibilityChange(index, isVisible);
    window.onscroll = onScroll;
  }, []);

  return (
    <Box {...boxProps}>
      <Typography
        ref={elemRef}
        id={elemCategoryId(category.id)}
        variant="h2"
        fontWeight="bold"
        marginBottom={2}
        fontSize={["1.5rem", "2.5rem"]}
      >
        {category.name}
      </Typography>
      <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
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
                    marginTop="auto"
                  >
                    {product.value}
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
