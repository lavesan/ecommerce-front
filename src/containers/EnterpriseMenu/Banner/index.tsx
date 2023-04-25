import { Box, Skeleton, Stack, BoxProps } from "@mui/material";
import { useEffect, useState } from "react";

interface IBannerProps extends BoxProps {
  src: string;
}

export const Banner = ({ src, ...boxProps }: IBannerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const onInit = () => {
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
  };

  useEffect(() => {
    onInit();
  }, []);

  return isLoading ? (
    <Box {...boxProps} height={[200, 300]}>
      <Skeleton animation="wave" height="100%" width="100%" />
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
