import { Box } from "@mui/material";

interface IAppLayoutProps extends React.PropsWithChildren {}

export const AppLayout = ({ children }: IAppLayoutProps) => {
  return <Box py={[2, 4]}>{children}</Box>;
};
