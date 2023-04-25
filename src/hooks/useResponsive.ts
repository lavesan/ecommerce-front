import useMediaQuery from "@mui/material/useMediaQuery";

interface IUseResponsiveReturn {
  isMobile: boolean;
}

export const useResponsive = (): IUseResponsiveReturn => {
  const matches = useMediaQuery("(max-width:600px)");

  return {
    isMobile: matches,
  };
};
