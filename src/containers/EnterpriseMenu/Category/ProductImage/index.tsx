import { useState, useRef, useEffect } from "react";
import { Box, Skeleton } from "@mui/material";

import { getImgUrl } from "@/helpers/image.helper";
import { useResponsive } from "@/hooks/useResponsive";

interface IProductImageProps {
  imageKey: string;
  productName: string;
}

export const ProductImage = ({ productName, imageKey }: IProductImageProps) => {
  const { isMobile } = useResponsive();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  const imgRef = useRef<HTMLImageElement>();

  useEffect(() => {
    if (imgRef.current?.complete) setIsLoading(false);
  }, []);

  return isLoading ? (
    <Skeleton
      animation="wave"
      variant="rectangular"
      sx={{
        position: "relative",
        width: isMobile ? "3.125rem" : "30%",
        height: 0,
        paddingBottom: isMobile ? "3.125rem" : "30%",
      }}
    >
      <Box
        ref={imgRef}
        component="img"
        alt={`Produto ${productName}`}
        src={getImgUrl(imageKey)}
        width={["3.125rem", "30%"]}
        height={["3.125rem", "auto"]}
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={() => {
          setIsError(true);
        }}
      />
    </Skeleton>
  ) : (
    <Box
      ref={imgRef}
      component="img"
      alt={`Produto ${productName}`}
      src={getImgUrl(imageKey)}
      width={["3.125rem", "30%"]}
      height={["3.125rem", "auto"]}
      onError={() => {
        setIsError(true);
      }}
    />
  );
};
