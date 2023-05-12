import { useAppContext } from "@/hooks/useAppContext";
import { Box } from "@mui/material";

export const AppLogo = () => {
  const { isDarkMode } = useAppContext();

  return (
    <Box
      component="img"
      src={isDarkMode ? "/static/logo-white.png" : "/static/logo.png"}
      width={["60px", "80px"]}
    />
  );
};
