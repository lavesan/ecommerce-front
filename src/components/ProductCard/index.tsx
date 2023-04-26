import { CardProps, Card, Box, CardContent, Typography } from "@mui/material";

import { ProductImage } from "@/containers/EnterpriseMenu/Category/ProductImage";
import { IProductProductCard } from "@/models/components/IProductProductCard";

interface IProductCardProps extends Omit<CardProps, "onClick"> {
  product: IProductProductCard;
  onClick: (product: IProductProductCard) => void;
}

export const ProductCard = ({
  product,
  onClick,
  sx: cardSx = {},
  ...cardProps
}: IProductCardProps) => {
  return (
    <Card
      {...cardProps}
      onClick={() => onClick(product)}
      sx={{
        transition: "0.3s",
        ":hover": {
          boxShadow: "1px 1px 8px gray",
        },
        ...cardSx,
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
        <ProductImage productName={product.name} imageKey={product.imageKey} />
      </Box>
    </Card>
  );
};
