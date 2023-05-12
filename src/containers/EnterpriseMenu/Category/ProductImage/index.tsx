import { useState, useRef, useEffect } from "react";
import { Box, Skeleton, BoxProps } from "@mui/material";

import { getImgUrl } from "@/helpers/image.helper";
import { useResponsive } from "@/hooks/useResponsive";

interface IProductImageProps extends BoxProps {
  imageKey: string;
  productName: string;
  width?: string[];
  height?: string[];
}

export const ProductImage = ({
  productName,
  imageKey,
  width = ["3.125rem", "30%"],
  height = ["3.125rem", "auto"],
  ...boxProps
}: IProductImageProps) => {
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
        width: isMobile ? width[0] : width[1],
        height: 0,
        paddingBottom: isMobile ? height[0] : height[1],
      }}
    >
      <Box
        ref={imgRef}
        component="img"
        alt={`Produto ${productName}`}
        src={getImgUrl(imageKey)}
        width={width}
        height={height}
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={() => {
          setIsError(true);
        }}
        loading="lazy"
      />
    </Skeleton>
  ) : (
    <Box
      {...boxProps}
      ref={imgRef}
      component="img"
      alt={`Produto ${productName}`}
      src={getImgUrl(imageKey)}
      width={width}
      height={height}
      onError={() => {
        setIsError(true);
      }}
      loading="lazy"
    />
  );
};
