import { useAppContext } from "@/hooks/useAppContext";
import { Box, BoxProps, Backdrop, styled } from "@mui/material";

const BouncingBox = styled(Box)({
  "@keyframes bouncing-loader": {
    to: {
      opacity: 0.1,
      transform: "translateY(-16px)",
    },
  },
});

interface IBouncingDotsLoaderProps {
  isLoading: boolean;
}

export const BouncingDotsLoader = ({ isLoading }: IBouncingDotsLoaderProps) => {
  const { isDarkMode } = useAppContext();

  const dotsStyle: BoxProps = {
    width: "16px",
    height: "16px",
    margin: "3px 6px",
    borderRadius: "50%",
    sx: {
      transition: (theme) => theme.transitions.create(["opacity", "transform"]),
    },
  };

  const dotsSx = {
    opacity: 1,
    backgroundColor: isDarkMode ? "white" : "primary.main",
    animation: "bouncing-loader 0.6s infinite alternate",
  };

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 999,
        backgroundColor: isDarkMode ? "grey.900" : "white",
      }}
      open={isLoading}
    >
      <Box display="flex" justifyContent="center">
        <BouncingBox {...dotsStyle} sx={dotsSx} />
        <BouncingBox
          {...dotsStyle}
          sx={{
            ...dotsSx,
            animationDelay: "0.2s",
          }}
        />
        <BouncingBox
          {...dotsStyle}
          sx={{
            ...dotsSx,
            animationDelay: "0.4s",
          }}
        />
      </Box>
    </Backdrop>
  );
};
