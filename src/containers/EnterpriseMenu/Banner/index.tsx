import { Box, Skeleton, Stack, BoxProps } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

interface IBannerProps extends BoxProps {
  src: string;
}

export const Banner = ({ src, ...boxProps }: IBannerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const onInit = useCallback(() => {
    const img = new Image();
    img.src = src;
    if (img.complete) setIsLoading(false);
    img.onload = () => {
      setIsLoading(false);
    };
    img.onerror = () => {
      setIsError(true);
    };
    return;
  }, [src]);

  useEffect(() => {
    onInit();
  }, [onInit]);

  return isLoading ? (
    <Box {...boxProps} height={[200, 300]}>
      <Skeleton
        animation="wave"
        variant="rectangular"
        height="100%"
        width="100%"
        sx={{ borderRadius: 3 }}
      />
    </Box>
  ) : (
    <Box
      {...boxProps}
      component="div"
      aria-details="Banner da empresa"
      height={[200, 300]}
      width="fit-content"
      sx={{
        width: "100%",
        borderRadius: 3,
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    />
  );
};
