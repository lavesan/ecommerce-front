import { Box, Paper } from "@mui/material";

import { Cart } from "@/components/Cart";
import { FormCheckout } from "./FornCheckout";

const Checkout = () => {
  return (
    <Box
      component="section"
      display="flex"
      flexDirection="row"
      flexWrap="nowrap"
      gap={2}
      px={4}
      sx={{
        "> *": {
          width: "50%",
        },
      }}
    >
      <FormCheckout />
      <Paper
        elevation={3}
        sx={{
          position: "sticky",
          top: 76,
          left: 0,
          height: "fit-content",
          px: 2,
        }}
      >
        <Cart isOnCheckoutPage />
      </Paper>
    </Box>
  );
};

export default Checkout;
