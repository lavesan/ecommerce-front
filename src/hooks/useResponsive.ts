import useMediaQuery from "@mui/material/useMediaQuery";

interface IUseResponsiveReturn {
  isMobile: boolean;
}

export const useResponsive = (): IUseResponsiveReturn => {
  const matches = useMediaQuery("(max-width:910px)");

  return {
    isMobile: matches,
  };
};
