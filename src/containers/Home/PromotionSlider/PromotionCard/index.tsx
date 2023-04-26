import { useEffect, useState } from "react";
import { Box, Skeleton, BoxProps, Link as MUILink } from "@mui/material";
import Link from "next/link";

import { IPromotion } from "@/models/entities/IPromotion";
import { getImgUrl } from "@/helpers/image.helper";

interface IPromotionCardProps extends BoxProps {
  promotion: IPromotion;
}

export const PromotionCard = ({
  promotion,
  ...boxProps
}: IPromotionCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const onInit = () => {
    const img = new Image();
    img.src = getImgUrl(promotion.imageKey);
    if (img.complete) setIsLoading(false);
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsError(true);
    };
    return;
  };

  useEffect(() => {
    onInit();
  }, []);

  return isLoading ? (
    <Box {...boxProps} height={[150, 200]}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        height="100%"
        width="100%"
        sx={{ borderRadius: 3 }}
      />
    </Box>
  ) : (
    <MUILink
      component={Link}
      color="inherit"
      href={`/promocao/${promotion.id}`}
      underline="none"
      title={promotion.name}
    >
      <Box
        {...boxProps}
        component="div"
        aria-details="Promotion's Banner"
        height={[150, 200]}
        width="fit-content"
        sx={{
          width: "100%",
          borderRadius: 3,
          backgroundImage: `url(${getImgUrl(promotion.imageKey)})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
    </MUILink>
  );
};
