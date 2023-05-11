import { Backdrop, CircularProgress } from "@mui/material";

interface ILoadingProps {
  isLoading: boolean;
}

export const Loading = ({ isLoading }: ILoadingProps) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 999 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
