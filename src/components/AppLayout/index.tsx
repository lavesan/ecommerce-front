import { Box } from "@mui/material";
import { Header } from "../Header";

interface IAppLayoutProps extends React.PropsWithChildren {}

export const AppLayout = ({ children }: IAppLayoutProps) => {
  return (
    <>
      <Header />
      <Box py={[2, 4]}>{children}</Box>;
    </>
  );
};
