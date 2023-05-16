import React from "react";
import { Box } from "@mui/material";
import { ReturnHeader } from "./ReturnHeader";

export const ReturnStepLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <ReturnHeader />
      <Box pt={[2, 4]} pb={[, 4]} px={2}>
        {children}
      </Box>
    </>
  );
};
