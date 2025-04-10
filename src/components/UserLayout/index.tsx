import React from "react";
import { Box, Grid } from "@mui/material";

import { useResponsive } from "@/hooks/useResponsive";
import { useAppContext } from "@/hooks/useAppContext";
import { ReturnHeader } from "../ReturnStepLayout/ReturnHeader";

export const UserLayout = ({ children }: React.PropsWithChildren) => {
  const { isMobile } = useResponsive();
  const { isDarkMode } = useAppContext();

  return (
    <>
      <ReturnHeader />
      <Grid
        container
        spacing={[0, 4]}
        flex={1}
        minWidth="100vw"
        alignItems="center"
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
        <Grid item xs={6} display={["none", "flex"]} alignSelf="stretch">
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
          height="fit-content"
          padding={4}
          sx={
            isMobile
              ? {
                  backgroundColor: isDarkMode ? "grey.900" : "white",
                  borderRadius: 3,
                }
              : {}
          }
        >
          {children}
        </Grid>
      </Grid>
    </>
  );
};
