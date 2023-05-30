import { Box } from "@mui/material";
import { Header } from "../Header";

interface IAppLayoutProps extends React.PropsWithChildren {}

export const AppLayout = ({ children }: IAppLayoutProps) => {
  return (
    <>
      <Header />
      <Box pt={[2, 4]} flex={1} display="flex" flexDirection="column">
        {children}
      </Box>
    </>
  );
};
