import React from "react";
import { Box, Grid } from "@mui/material";
import { useResponsive } from "@/hooks/useResponsive";

export const UserLayout = ({ children }: React.PropsWithChildren) => {
  const { isMobile } = useResponsive();

  return (
    <Grid
      container
      spacing={[1, 4]}
      flex={1}
      minWidth="100vw"
      sx={
        isMobile
          ? {
              backgroundImage: `url(/static/login.jpg)`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              padding: 3,
            }
          : {}
      }
    >
      <Grid item xs={6} display={["none", "flex"]}>
        <Box
          sx={{
            width: "100%",
            backgroundImage: `url(/static/login.jpg)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        alignItems="center"
        sx={
          isMobile
            ? {
                backgroundColor: "grey.100",
                borderRadius: 3,
                padding: 2,
              }
            : {
                paddingRight: 4,
              }
        }
      >
        {children}
      </Grid>
    </Grid>
  );
};
