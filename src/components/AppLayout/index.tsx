import { Box } from "@mui/material";

interface IAppLayoutProps extends React.PropsWithChildren {}

export const AppLayout = ({ children }: IAppLayoutProps) => {
  return <Box paddingTop="50px">{children}</Box>;
};
