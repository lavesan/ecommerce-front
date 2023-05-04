import { useMemo } from "react";
import {
  CardProps,
  Card,
  Box,
  CardContent,
  Typography,
  CardActionArea,
  Tooltip,
} from "@mui/material";

import { ProductImage } from "@/containers/EnterpriseMenu/Category/ProductImage";
import { IProductProductCard } from "@/models/components/IProductProductCard";

import LocalActivityIcon from "@mui/icons-material/LocalActivity";

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
  const pointsInfo = useMemo(() => {
    return `Pontos que dá ao ser vendido: ${product.givenPoints}
    Pontos para ser adquirido: ${product.sellPoints}`;
  }, [product]);

  return (
    <Card
      {...cardProps}
      sx={{
        transition: "0.3s",
        ":hover": {
          boxShadow: "1px 1px 8px gray",
        },
        ...cardSx,
      }}
    >
      <CardActionArea onClick={() => onClick(product)}>
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
              display="flex"
              flexDirection="row"
              alignItems="center"
            >
              {product.promotionValue && product.promotionValue}{" "}
              <Box
                component="span"
                sx={
                  product.promotionValue
                    ? {
                        color: "grey.500",
                        fontWeight: "normal",
                        fontSize: "small",
                        textDecoration: "line-through",
                        textDecorationColor: "grey.500",
                        marginLeft: 1,
                      }
                    : {}
                }
              >
                {product.value}
              </Box>
              <Tooltip
                title={
                  <Box component="span" whiteSpace="pre-line">
                    {pointsInfo}
                  </Box>
                }
              >
                <LocalActivityIcon sx={{ marginLeft: 2 }} />
              </Tooltip>
            </Typography>
          </CardContent>
          <ProductImage
            productName={product.name}
            imageKey={product.imageKey}
          />
        </Box>
      </CardActionArea>
    </Card>
  );
};
