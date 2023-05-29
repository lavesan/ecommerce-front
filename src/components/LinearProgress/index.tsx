import { Box, BoxProps, styled } from "@mui/material";

const LinearProgressContainer = styled(Box)({
  "@keyframes width-keyframe": {
    from: {
      width: 0,
    },
    to: {
      width: "100%",
    },
  },
});

interface ILinearProgress extends BoxProps {
  progressWidth: string;
}

export const LinearProgress = ({
  progressWidth,
  sx = {},
  ...boxProps
}: ILinearProgress) => {
  return (
    <LinearProgressContainer
      width="100%"
      {...boxProps}
      overflow="hidden"
      borderRadius={4}
      height="6px"
      sx={{ backgroundColor: "grey.300", ...sx }}
    >
      <Box
        height="100%"
        width={progressWidth}
        sx={{
          backgroundColor: "primary.light",
          transition: "width 0.3s",
        }}
      >
        <Box
          height="100%"
          sx={{
            backgroundColor: "primary.dark",
            animation: "width-keyframe 2s infinite",
          }}
        />
      </Box>
    </LinearProgressContainer>
  );
};
