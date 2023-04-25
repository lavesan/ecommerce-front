import { Box, Skeleton } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface ILogoProps {
  src: string;
}

export const Logo = ({ src }: ILogoProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const imgRef = useRef<HTMLImageElement>();

  useEffect(() => {
    if (imgRef.current?.complete) setIsLoading(false);
  }, []);

  return isLoading ? (
    <Skeleton variant="circular" animation="wave" height={50} width={50}>
      <Box
        ref={imgRef}
        component="img"
        aria-details="Banner da empresa"
        alt="Logo da empresa"
        height={50}
        width={50}
        borderRadius="50%"
        border={(theme) => `thin solid ${theme.palette.grey[400]}`}
        src={src}
        onLoad={() => {
          //   setIsLoading(false);
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
      aria-details="Banner da empresa"
      alt="Logo da empresa"
      height={50}
      width={50}
      borderRadius="50%"
      border={(theme) => `thin solid ${theme.palette.grey[400]}`}
      src={src}
    />
  );
};
